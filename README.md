```
       _                _           _          __              
  ___ | |  ___   _   _ | |_        (_) _ __   / _| _ __   __ _ 
 / _ \| | / _ \ | | | || __| _____ | || '_ \ | |_ | '__| / _` |
|  __/| || (_) || |_| || |_ |_____|| || | | ||  _|| |   | (_| |
 \___||_| \___/  \__, | \__|       |_||_| |_||_|  |_|    \__,_|
                 |___/                                         
```

# Setup

* Install docker `https://docs.docker.com/engine/installation/`
* Install minikube `https://github.com/kubernetes/minikube`

run following commands
```
make permissions
```

* Hosts (minikube)
run the following command to get the minikube ip: `minikube ip`

Add following lines into `/etc/hosts`
```
{minikube ip} dev.eloyt.com
{minikube ip} dev.api.eloyt.com
{minikube ip} dev.rabbitmq.eloyt.com
{minikube ip} adminer.eloyt.com
```

* Hosts (docker compose)
run the following command to get the minikube ip: `minikube ip`

Add following lines into `/etc/hosts`
```
0.0.0.0 dev.eloyt.com
0.0.0.0 dev.api.eloyt.com
0.0.0.0 dev.rabbitmq.eloyt.com
0.0.0.0 adminer.eloyt.com
```

# Clone Repository with submodules
```
git clone --recursive git@github.com:eloythub/eloyt-infra.git
cd eloyt-infra
git submodule foreach git checkout master
git submodule update --remote --merge
```

# run docker compose
```
make install
make install-dump
```

# Deployment Priority
```
# Database
./kube/src/kube-apply dev postgres/service
./deploy dev postgres v0.0.0

./kube/src/kube-apply dev redis/service
./deploy dev redis v0.0.0

./kube/src/kube-apply dev rabbitmq/service
./deploy dev rabbitmq v0.0.0

# Load balancer
./kube/src/kube-apply dev load-balancer/ingress

# api.eloyt.com
./kube/src/kube-apply dev api.eloyt.com/service
./deploy dev api.eloyt.com v0.0.0

# eloyt.com
./kube/src/kube-apply dev eloyt.com/service
./deploy dev eloyt.com v0.0.0
```

# Create Database on Staging
```
./kube/src/kube-psql "CREATE DATABASE eloytdb"
./kube/src/kube-psql "CREATE DATABASE eloytdb_test"
```
