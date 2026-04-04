{{- define "paynext.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "paynext.fullname" -}}
{{- $name := default .Chart.Name .Values.nameOverride -}}
{{- if .Values.fullnameOverride -}}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}

{{- define "paynext.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "paynext.labels" -}}
helm.sh/chart: {{ include "paynext.chart" . }}
{{ include "paynext.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}

{{- define "paynext.selectorLabels" -}}
app.kubernetes.io/name: {{ include "paynext.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}

{{- define "paynext.namespace" -}}
{{- .Values.global.namespace | default .Release.Namespace -}}
{{- end -}}

{{- define "paynext.serviceAccountName" -}}
{{- if .Values.serviceAccount.create -}}
    {{ default (include "paynext.fullname" .) .Values.serviceAccount.name }}
{{- else -}}
    {{ default "default" .Values.serviceAccount.name }}
{{- end -}}
{{- end -}}

{{- define "paynext.securityContext" -}}
{{- if .securityContext.enabled -}}
securityContext:
  runAsNonRoot: {{ .securityContext.runAsNonRoot }}
  runAsUser: {{ .securityContext.runAsUser }}
  {{- if .securityContext.fsGroup }}
  fsGroup: {{ .securityContext.fsGroup }}
  {{- end }}
  {{- if .securityContext.capabilities }}
  capabilities:
    {{- toYaml .securityContext.capabilities | nindent 4 }}
  {{- end }}
{{- end -}}
{{- end -}}

{{- define "paynext.resources" -}}
{{- if and .resources .resources.requests -}}
resources:
  {{- if .resources.requests }}
  requests:
    memory: {{ .resources.requests.memory | quote }}
    cpu: {{ .resources.requests.cpu | quote }}
  {{- end }}
  {{- if .resources.limits }}
  limits:
    memory: {{ .resources.limits.memory | quote }}
    cpu: {{ .resources.limits.cpu | quote }}
  {{- end }}
{{- end -}}
{{- end -}}

{{- define "paynext.probes" -}}
{{- if .livenessProbe -}}
livenessProbe:
  httpGet:
    path: {{ .livenessProbe.httpGet.path | default "/actuator/health/liveness" }}
    port: {{ .livenessProbe.httpGet.port | default "http" }}
  initialDelaySeconds: {{ .livenessProbe.initialDelaySeconds | default 60 }}
  periodSeconds: {{ .livenessProbe.periodSeconds | default 10 }}
  timeoutSeconds: {{ .livenessProbe.timeoutSeconds | default 5 }}
  failureThreshold: {{ .livenessProbe.failureThreshold | default 5 }}
{{- end -}}
{{- if .readinessProbe -}}
readinessProbe:
  httpGet:
    path: {{ .readinessProbe.httpGet.path | default "/actuator/health/readiness" }}
    port: {{ .readinessProbe.httpGet.port | default "http" }}
  initialDelaySeconds: {{ .readinessProbe.initialDelaySeconds | default 30 }}
  periodSeconds: {{ .readinessProbe.periodSeconds | default 10 }}
  timeoutSeconds: {{ .readinessProbe.timeoutSeconds | default 5 }}
  failureThreshold: {{ .readinessProbe.failureThreshold | default 3 }}
{{- end -}}
{{- end -}}
