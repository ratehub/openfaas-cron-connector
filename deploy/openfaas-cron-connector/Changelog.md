# Change Log

## 1.1.8 

**Release date:** 2023-05-04

![AppVersion: 2.1.1](https://img.shields.io/static/v1?label=AppVersion&message=2.1.1&color=success&logo=)
![Helm: v3](https://img.shields.io/static/v1?label=Helm&message=v3&color=informational&logo=helm)


* fix(helm): to use correct autoscaling syntax 

### Default value changes

```diff
# No changes in this release
```

## 1.1.7 

**Release date:** 2023-05-02

![AppVersion: 2.1.1](https://img.shields.io/static/v1?label=AppVersion&message=2.1.1&color=success&logo=)
![Helm: v3](https://img.shields.io/static/v1?label=Helm&message=v3&color=informational&logo=helm)


* fix: Update to autoscaling/v2 (#17) 

### Default value changes

```diff
# No changes in this release
```

## 1.1.6 

**Release date:** 2021-05-27

![AppVersion: 2.1.1](https://img.shields.io/static/v1?label=AppVersion&message=2.1.1&color=success&logo=)
![Helm: v3](https://img.shields.io/static/v1?label=Helm&message=v3&color=informational&logo=helm)


* deploy: update helm chart newrelic logging to stdout 

### Default value changes

```diff
# No changes in this release
```

## 1.1.5 

**Release date:** 2021-05-27

![AppVersion: 2.1.1](https://img.shields.io/static/v1?label=AppVersion&message=2.1.1&color=success&logo=)
![Helm: v3](https://img.shields.io/static/v1?label=Helm&message=v3&color=informational&logo=helm)


* deploy(cron-connector): qoute bool 

### Default value changes

```diff
# No changes in this release
```

## 1.1.4 

**Release date:** 2021-05-27

![AppVersion: 2.1.1](https://img.shields.io/static/v1?label=AppVersion&message=2.1.1&color=success&logo=)
![Helm: v3](https://img.shields.io/static/v1?label=Helm&message=v3&color=informational&logo=helm)


* deploy: update chart to default logging off 

### Default value changes

```diff
# No changes in this release
```

## 1.1.3 

**Release date:** 2021-05-26

![AppVersion: 2.1.1](https://img.shields.io/static/v1?label=AppVersion&message=2.1.1&color=success&logo=)
![Helm: v3](https://img.shields.io/static/v1?label=Helm&message=v3&color=informational&logo=helm)


* deploy(cron-connector): remove log path 

### Default value changes

```diff
# No changes in this release
```

## 1.1.2 

**Release date:** 2021-05-26

![AppVersion: 2.1.1](https://img.shields.io/static/v1?label=AppVersion&message=2.1.1&color=success&logo=)
![Helm: v3](https://img.shields.io/static/v1?label=Helm&message=v3&color=informational&logo=helm)


* deploy: bump helm chart 
* fix: add NR and adds settings to helm chart 

### Default value changes

```diff
# No changes in this release
```

## 1.1.1 

**Release date:** 2021-04-07

![AppVersion: 1.0.1](https://img.shields.io/static/v1?label=AppVersion&message=1.0.1&color=success&logo=)
![Helm: v3](https://img.shields.io/static/v1?label=Helm&message=v3&color=informational&logo=helm)


* fix(chart):  [PLAT-1062]  cleanup values file and unuse Deployment properties 
* [PLAT-1062]  fix the image and repo  names in the values file 
* fix(chart): [PLAT-1062]  helm chart updates 

### Default value changes

```diff
diff --git a/deploy/openfaas-cron-connector/values.yaml b/deploy/openfaas-cron-connector/values.yaml
index cb7f604..fa2f2bf 100644
--- a/deploy/openfaas-cron-connector/values.yaml
+++ b/deploy/openfaas-cron-connector/values.yaml
@@ -5,7 +5,7 @@
 replicaCount: 1
 
 image:
-  repository: nginx
+  repository: gcr.io/platform-235214/openfaas-cron-connector
   pullPolicy: IfNotPresent
   # Overrides the image tag whose default is the chart appVersion.
   tag: ""
@@ -18,8 +18,8 @@ settings:
   connector_name: openfaas-cron-connector
   faas_gateway: gateway:8080
   gateway_ssl: false
-  linkerd: enabled
   timeout: 30000
+  ## Assuming faas_gateway_* are secrets you should use VSWH to manage them if you need them.
   #faas_gateway_user: admin
   #faas_gateway_pass: admin
 
```

## 1.1.0 

**Release date:** 2021-03-19

![AppVersion: 1.0.1](https://img.shields.io/static/v1?label=AppVersion&message=1.0.1&color=success&logo=)
![Helm: v3](https://img.shields.io/static/v1?label=Helm&message=v3&color=informational&logo=helm)


* fix(chart): [PLAT-1062] refactoring the Helm chart 
* enable linkerd 
* add linkerd support to helm chart 
* bump version with json logging 
* [fix] - Add imagePullSecrets 
* [wip] - Add github actions for build, release 
* Incremented chart version to 1.0.2 
* Upped chart version to 1.0.1 
* Update name of cron-connector chart in helpers file 
* Add helpers file 
* Fix chart deployment issue 

### Default value changes

```diff
diff --git a/deploy/openfaas-cron-connector/values.yaml b/deploy/openfaas-cron-connector/values.yaml
index 9abbd50..cb7f604 100644
--- a/deploy/openfaas-cron-connector/values.yaml
+++ b/deploy/openfaas-cron-connector/values.yaml
@@ -4,13 +4,63 @@
 
 replicaCount: 1
 
-image: ratehub/openfaas-cron-connector:latest
-connector_name: openfaas-cron-connector
-faas_gateway: gateway:8080
-gateway_ssl: false
-#faas_gateway_user: admin
-#faas_gateway_pass: admin
-timeout: 30000
+image:
+  repository: nginx
+  pullPolicy: IfNotPresent
+  # Overrides the image tag whose default is the chart appVersion.
+  tag: ""
+
+imagePullSecrets: []
+nameOverride: ""
+fullnameOverride: ""
+
+settings:
+  connector_name: openfaas-cron-connector
+  faas_gateway: gateway:8080
+  gateway_ssl: false
+  linkerd: enabled
+  timeout: 30000
+  #faas_gateway_user: admin
+  #faas_gateway_pass: admin
+
+basicAuthSecrets:
+  existingSecrets: true
+  nameOverride: ''
+  values:
+    basic-auth-password: ''
+    basic-auth-user: ''
+
+linkerd:
+  enabled: true
+
+## The ServiceAccount is used for Vault integration.
+serviceAccount:
+  # Specifies whether a service account should be created
+  create: true
+  # Annotations to add to the service account
+  annotations: {}
+  # The name of the service account to use.
+  # If not set and create is true, a name is generated using the fullname template
+  name: ""
+
+## Uncomment and update the VSWH settings to inject secrets into pods.
+podAnnotations: {}
+  # vault.security.banzaicloud.io/vault-addr: "https://vault.default.svc.cluster.local.:8200"
+  # vault.security.banzaicloud.io/vault-tls-secret: "vault-tls"
+  # vault.security.banzaicloud.io/vault-path: kubernetes
+  # vault.security.banzaicloud.io/vault-role: 
+  # vault.security.banzaicloud.io/vault-skip-verify: "true" # Container is missing Trusted Mozilla roots too.
+
+podSecurityContext:
+  fsGroup: 2000
+
+securityContext:
+  # capabilities:
+  #   drop:
+  #   - ALL
+  readOnlyRootFilesystem: true
+  runAsNonRoot: true
+  runAsUser: 1000
 
 resources: {}
   # We usually recommend not to specify default resources and to leave this as a conscious
@@ -24,6 +74,13 @@ resources: {}
   #   cpu: 100m
   #   memory: 128Mi
 
+autoscaling:
+  enabled: false
+  minReplicas: 1
+  maxReplicas: 100
+  targetCPUUtilizationPercentage: 80
+  # targetMemoryUtilizationPercentage: 80
+
 nodeSelector: {}
 
 tolerations: []
```

## 1.0.0 

**Release date:** 2020-02-28

![AppVersion: 1.0.0](https://img.shields.io/static/v1?label=AppVersion&message=1.0.0&color=success&logo=)
![Helm: v2](https://img.shields.io/static/v1?label=Helm&message=v2&color=inactive&logo=helm)
![Helm: v3](https://img.shields.io/static/v1?label=Helm&message=v3&color=informational&logo=helm)


* Add inital version of helm chart 

### Default value changes

```diff
# Default values for openfaas-cron-connector.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

image: ratehub/openfaas-cron-connector:latest
connector_name: openfaas-cron-connector
faas_gateway: gateway:8080
gateway_ssl: false
#faas_gateway_user: admin
#faas_gateway_pass: admin
timeout: 30000

resources: {}
  # We usually recommend not to specify default resources and to leave this as a conscious
  # choice for the user. This also increases chances charts run on environments with little
  # resources, such as Minikube. If you do want to specify resources, uncomment the following
  # lines, adjust them as necessary, and remove the curly braces after 'resources:'.
  # limits:
  #   cpu: 100m
  #   memory: 128Mi
  # requests:
  #   cpu: 100m
  #   memory: 128Mi

nodeSelector: {}

tolerations: []

affinity: {}
```

---
Autogenerated from Helm Chart and git history using [helm-changelog](https://github.com/mogensen/helm-changelog)
