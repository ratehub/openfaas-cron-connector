# openfaas-cron-connector

![Version: 1.1.1](https://img.shields.io/badge/Version-1.1.1-informational?style=flat-square) ![Type: application](https://img.shields.io/badge/Type-application-informational?style=flat-square) ![AppVersion: 1.0.1](https://img.shields.io/badge/AppVersion-1.0.1-informational?style=flat-square)

A Helm chart for OpenFaaS Cron-Connector

## Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| affinity | object | `{}` |  |
| autoscaling.enabled | bool | `false` |  |
| autoscaling.maxReplicas | int | `100` |  |
| autoscaling.minReplicas | int | `1` |  |
| autoscaling.targetCPUUtilizationPercentage | int | `80` |  |
| basicAuthSecrets.existingSecrets | bool | `true` |  |
| basicAuthSecrets.nameOverride | string | `""` |  |
| basicAuthSecrets.values.basic-auth-password | string | `""` |  |
| basicAuthSecrets.values.basic-auth-user | string | `""` |  |
| fullnameOverride | string | `""` |  |
| image.pullPolicy | string | `"IfNotPresent"` |  |
| image.repository | string | `"gcr.io/platform-235214/openfaas-cron-connector"` |  |
| image.tag | string | `""` |  |
| imagePullSecrets | list | `[]` |  |
| linkerd.enabled | bool | `true` |  |
| nameOverride | string | `""` |  |
| nodeSelector | object | `{}` |  |
| podAnnotations | object | `{}` |  |
| podSecurityContext.fsGroup | int | `2000` |  |
| replicaCount | int | `1` |  |
| resources | object | `{}` |  |
| securityContext.readOnlyRootFilesystem | bool | `true` |  |
| securityContext.runAsNonRoot | bool | `true` |  |
| securityContext.runAsUser | int | `1000` |  |
| serviceAccount.annotations | object | `{}` |  |
| serviceAccount.create | bool | `true` |  |
| serviceAccount.name | string | `""` |  |
| settings.connector_name | string | `"openfaas-cron-connector"` |  |
| settings.faas_gateway | string | `"gateway:8080"` |  |
| settings.gateway_ssl | bool | `false` |  |
| settings.timeout | int | `30000` |  |
| tolerations | list | `[]` |  |

