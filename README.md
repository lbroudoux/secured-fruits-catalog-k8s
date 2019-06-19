# secured-fruits-catalog-k8s

How to add security layer to your existing application with minimal touch to code !

```
$ oc new-project fruits-catalog --display-name="Fruits Catalog"
[...]
$ oc new-app mongodb-persistent --name=mongodb -p DATABASE_SERVICE_NAME=mongodb -p MONGODB_DATABASE=sampledb -l app=fruits-catalog -n fruits-catalog
[...]
$ mvn fabric8:deploy -Popenshift
[...]
```
