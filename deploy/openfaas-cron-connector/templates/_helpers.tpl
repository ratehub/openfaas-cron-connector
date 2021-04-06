{{/*
Expand the name of the chart.
*/}}
{{- define "openfaas-cron-connector.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "openfaas-cron-connector.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "openfaas-cron-connector.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "openfaas-cron-connector.labels" -}}
helm.sh/chart: {{ include "openfaas-cron-connector.chart" . }}
{{ include "openfaas-cron-connector.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "openfaas-cron-connector.selectorLabels" -}}
app.kubernetes.io/name: {{ include "openfaas-cron-connector.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "openfaas-cron-connector.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "openfaas-cron-connector.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}

{{/*
Linkerd Annotations
*/}}
{{- define "openfaas-cron-connector.linkerdAnnotations" -}}
{{- if .Values.linkerd.enabled -}}
linkerd.io/inject: enabled
{{- else -}}
linkerd.io/inject: disabled
{{- end -}}
{{- end }}

{{/*
Basic-Auth Secret name
*/}}
{{- define "openfaas-cron-connector.basic-auth-secrets-name" -}}
{{- $defaultSecretName := (printf "%s%s" .Release.Name "-basic-auth-secrets") -}}
{{- default $defaultSecretName .Values.basicAuthSecrets.nameOverride | trimSuffix "-" -}}
{{- end -}}
