git-pull:
	@git pull
	@git submodule init
	@git submodule update
	@git pull --recurse-submodules
	@git submodule update --remote --merge
	@git submodule foreach "git checkout master"
	@git submodule foreach "git pull"

install:
	@docker-compose down && docker-compose up -d --build

install-dump:
	@docker-compose down && docker-compose up --build

install-dump-no-cache:
	@docker-compose down && docker-compose build --no-cache && docker-compose up

test:
	@docker exec -it eloytinfra_api_1 npm test

image-cleanup:
	@docker rmi -f $$(docker images -f "dangling=true" -q) 1> /dev/null 2> /dev/null
	@docker rmi -f $$(docker images | grep eloyt.azurecr.io | awk '{ print $$3; }') 1> /dev/null 2> /dev/null

permissions:
	@chmod +x ./deploy
	@chmod +x ./kube/src/*
