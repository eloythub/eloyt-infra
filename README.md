```
.___    .___                _________ __            .___.__        
|   | __| _/____ _____     /   _____//  |_ __ __  __| _/|__| ____  
|   |/ __ |/ __ \\__  \    \_____  \\   __\  |  \/ __ | |  |/  _ \
|   / /_/ \  ___/ / __ \_  /        \|  | |  |  / /_/ | |  (  <_> )
|___\____ |\___  >____  / /_______  /|__| |____/\____ | |__|\____/
         \/    \/     \/          \/                 \/            
```

Docker for idea studio

# Setup
* Hosts
Add following lines into `/etc/hosts`
```
127.0.0.1 dev.api.idea-studio.eloyt.com
```

* Install docker `https://docs.docker.com/engine/installation/`

* Clone Repository with submodules
```
git clone --recursive git@github.com:eloythub/idea-studio-docker.git
cd idea-studio-docker
git submodule foreach git checkout master
git submodule update --remote --merge
# make symlink to have access to ../idea-studio-api
make symlinks
```

* Compose Containers
```
make install
```

* Health Check
u can run the following command:
```
curl http://dev.api.idea-studio.eloyt.com/status
```
