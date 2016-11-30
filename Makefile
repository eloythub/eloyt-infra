update-git-submodules:
	git pull --recurse-submodules
	git submodule foreach git checkout master
	git submodule update --remote --merge

install:
	docker-compose down && docker-compose up -d --build

install-dump:
	docker-compose down && docker-compose up --build

test:
	docker exec -it ideastudiodocker_api_1 npm test

image-cleanup:
	docker rm -f $$(docker ps -aq)
