```
.___    .___                _________ __            .___.__        
|   | __| _/____ _____     /   _____//  |_ __ __  __| _/|__| ____  
|   |/ __ |/ __ \\__  \    \_____  \\   __\  |  \/ __ | |  |/  _ \
|   / /_/ \  ___/ / __ \_  /        \|  | |  |  / /_/ | |  (  <_> )
|___\____ |\___  >____  / /_______  /|__| |____/\____ | |__|\____/
         \/    \/     \/          \/                 \/            
```

Docker for idea studio

# setup

* install docker `https://docs.docker.com/engine/installation/`

* Clone Repository with submodules
```
git clone --recursive git@github.com:eloythub/idea-studio-docker.git
cd idea-studio-docker
git submodule foreach git checkout master
git submodule update --remote --merge
```

* compose containers
```
chmod +x ./composer-install
# compose down && up -d --build
./composer-install
```
