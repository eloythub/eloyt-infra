```
       _                _           _          __              
  ___ | |  ___   _   _ | |_        (_) _ __   / _| _ __   __ _ 
 / _ \| | / _ \ | | | || __| _____ | || '_ \ | |_ | '__| / _` |
|  __/| || (_) || |_| || |_ |_____|| || | | ||  _|| |   | (_| |
 \___||_| \___/  \__, | \__|       |_||_| |_||_|  |_|    \__,_|
                 |___/                                         
```

# Setup
* Hosts
Add following lines into `/etc/hosts`
```
0.0.0.0 dev.eloyt.com
0.0.0.0 dev.api.eloyt.com
```

* Install docker `https://docs.docker.com/engine/installation/`

* Clone Repository with submodules
```
git clone --recursive git@github.com:eloythub/eloyt-infra.git
cd eloyt-infra
git submodule foreach git checkout master
git submodule update --remote --merg
```

* Compose Containers
```
make install
```

* Health Check
u can run the following command:
```
curl http://dev.eloyt.com/status
curl http://dev.api.eloyt.com/status
```

# Deployment Priority
```
./gcloud-push redis latest
./gcloud-push mongo latest
./gcloud-push slack-deployer-bot latest
./gcloud-push storage latest
./gcloud-push eloyt.com misc-1.0
./gcloud-push api.eloyt.com misc-1.0
./gcloud-push load-balancer misc-1.0
```
