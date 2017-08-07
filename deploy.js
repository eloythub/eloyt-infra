
const fs            = require('fs')
const path          = require('path')
const {exec, spawn} = require('child_process')
const Promise       = require('promise')

const [, , env, service, tagVersion] = process.argv

const tag = `${env}-${tagVersion}`

const manifestDir  = path.resolve(path.join(__dirname, 'kube', '.deploy-manifests', env, service))
const manifestFile = path.join(manifestDir, `${tag}.json`)
const servicesDir  = path.resolve(path.join(__dirname, 'services'))

const kubeApplySrc = path.resolve(path.join(__dirname, 'kube', 'src', 'kube-apply'))

const kubernetesConfig = path.join(service, 'deployment')

const dockerLocalImage = `eloyt/${service}`
const dockerAzureImage = `eloyt.azurecr.io/${service}`

function shell (cmd, args, opt) {
  return new Promise(function (resolve, reject) {
    'use strict'

    const spawnStream = spawn(cmd, args, opt)

    spawnStream.stdout.on('data', function (data) {
      console.info(data.toString().trim())
    })

    spawnStream.stderr.on('data', function (data) {
      //console.error(data.toString().trim())

      reject(data.toString().trim())
    })

    spawnStream.on('exit', function (code) {
      if (code === 0) {
        return resolve()
      }

      return reject()
    })
  })
}

async function createImage () {
  'use strict'

  const serviceProductionDockerFile = path.join(servicesDir, service, 'Dockerfile.prod')

  if (!fs.existsSync(serviceProductionDockerFile)) {
    console.error('there is no dockerfile for production')

    process.exit(1)
  }

  console.log('Creating image: ', serviceProductionDockerFile)


  try {
    const cwd = path.join(servicesDir, service) // switch the directory to service

    await shell('docker', ['build', '.', '-f', 'Dockerfile.prod', '-t',  `${dockerLocalImage}:${tag}`], { cwd })
    await shell('docker', ['tag', `${dockerLocalImage}:${tag}`, `${dockerAzureImage}:${tag}`], { cwd })
    await shell('docker', ['push', `${dockerAzureImage}:${tag}`], { cwd })
  } catch (err) {
    fs.unlinkSync(manifestFile)

    console.error('error', err)

    process.exit(1)
  }

  return
}

async function updateManifest () {
  'use strict'

  const manifestWriteStream = fs.createWriteStream(manifestFile, {
    flags: 'w',
    defaultEncoding: 'utf8',
    fd: null,
    mode: 0o666,
    autoClose: true
  })

  const manifestData = {
    image: `eloyt.azurecr.io/${service}:${tag}`,
    tag: tag,
    uri: `eloyt.azurecr.io/${service}`
  }

  manifestWriteStream.write(JSON.stringify(manifestData))

  return manifestData
}

async function deploy (manifest) {
  'use strict'

  if (!manifest.hasOwnProperty('image') || !manifest.hasOwnProperty('tag')) {
    console.error('manifest corrupted:', manifestFile)
    await createImage()

    manifest = await updateManifest()
  }

  // apply the deployment to kubernetes
  try {
    await shell(kubeApplySrc, [env, kubernetesConfig], {
      cwd: process.cwd(),
      gid: process.getgid(),
      uid: process.getuid(),
      env: Object.assign({
        'IMAGE_URI': manifest.image,
        'USER_HOME': process.env.HOME
      }, process.env)
    })
  } catch (err) {
    fs.unlinkSync(manifestFile)

    console.error('error', err)

    process.exit(1)
  }
}

function ensureDirectoryExistence (filePath) {
  const dirname = path.dirname(filePath)

  if (fs.existsSync(dirname)) {
    return true
  }

  ensureDirectoryExistence(dirname)
  fs.mkdirSync(dirname)
}

function start () {
  'use strict'

  try {
    if (!fs.existsSync(path.join(servicesDir, service))) {
      return console.error('service is not available')
    }

    ensureDirectoryExistence(manifestFile)

    if (!fs.existsSync(manifestFile)) {
      const manifestWriteStream = fs.createWriteStream(manifestFile, {
        flags: 'w',
        defaultEncoding: 'utf8',
        fd: null,
        mode: 0o666,
        autoClose: true
      })

      manifestWriteStream.write(JSON.stringify({}))
    }

    let manifest = ''
    fs.createReadStream(manifestFile)
      .on('data', function (chunk) {
        manifest += chunk
      })
      .on('end', function () {
        manifest = JSON.parse(manifest)

        deploy(manifest)
      })
  } catch (err) {
    console.error(err)
  }
}

start()
