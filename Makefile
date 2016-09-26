install:
	docker-compose down && docker-compose up -d --build

symlinks:
	cd ../
	ln -s idea-studio-docker/docker/api/ idea-studio-api
	cd idea-studio-docker

image-cleanup:
	docker rm -f $$(docker ps -aq)
