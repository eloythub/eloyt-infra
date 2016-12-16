git-pull:
	@git pull --recurse-submodules
	@git submodule foreach "git checkout master"
	@git submodule foreach "git pull"
	@git submodule update --remote --merge

install:
	@docker-compose down && docker-compose up -d --build

install-dump:
	@docker-compose down && docker-compose up --build

test:
	@docker exec -it eloytinfra_api_1 npm test

image-cleanup:
	@if [[ $$(docker images -f "dangling=true" -q) ]]; then @docker rmi $$(docker images -f "dangling=true" -q) 1>/dev/null; fi

create-network:
	@docker network ls -f name=eloyt-network | grep eloyt-network > /dev/null || docker network create eloyt-network;
