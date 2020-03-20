# secured-fruits-catalog-k8s

How to add security layer to your existing application with minimal touch to code !

This is the companion project of the blog series I started here: [Adding security layers to your App on OpenShift](https://medium.com/@lbroudoux/adding-security-layers-to-your-app-on-openshift-part-1-deployment-and-tls-ingress-9ef752835599).

## OpenShift versions

This has been deployed successfully on OpenShift 3.11 and on OpenShift 4.1+

For OpenShift 3.11, make sure to change the Fabric8 Maven Plugin version in the `pom.xml` file:

```
   <fabric8-fmp.version>3.5.41</fabric8-fmp.version>
```

For OpenShift 4.2+ you have to use the latest version (the default now)

```
   <fabric8-fmp.version>4.3.1</fabric8-fmp.version>
```

## Quick local deployment

> You should have a MongoDB instance running locally on port 27017.

```
$ mvn spring-boot:run
[...]
```

## Quick deployment on OpenShift

```
$ oc new-project fruits-catalog --display-name="Fruits Catalog"
[...]
$ oc new-app mongodb-persistent --name=mongodb -p DATABASE_SERVICE_NAME=mongodb -p MONGODB_DATABASE=sampledb -l app=fruits-catalog -n fruits-catalog
[...]
$ mvn fabric8:deploy -Popenshift
[...]
```
