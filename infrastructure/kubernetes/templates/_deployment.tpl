{{- define "paynext.deployment" -}}
{{- $serviceName := .serviceName -}}
{{- $service := index .Values.services $serviceName -}}
{{- $root := .root -}}
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ $serviceName }}
  namespace: {{ $root.Values.global.namespace | default $root.Release.Namespace }}
  labels:
    {{- include "paynext.labels" $root | nindent 4 }}
    app.kubernetes.io/component: {{ $serviceName }}
spec:
  replicas: {{ $service.replicaCount | default 1 }}
  selector:
    matchLabels:
      {{- include "paynext.selectorLabels" $root | nindent 6 }}
      app.kubernetes.io/component: {{ $serviceName }}
  template:
    metadata:
      labels:
        {{- include "paynext.selectorLabels" $root | nindent 8 }}
        app.kubernetes.io/component: {{ $serviceName }}
      annotations:
        checksum/config: {{ $service | toJson | sha256sum }}
    spec:
      {{- with $root.Values.imagePullSecrets }}
      imagePullSecrets:
        {{- toYaml . | nindent 8 }}
      {{- end }}
      serviceAccountName: {{ include "paynext.serviceAccountName" $root }}
      securityContext:
        runAsNonRoot: {{ $root.Values.global.security.securityContext.runAsNonRoot | default true }}
        runAsUser: {{ $root.Values.global.security.securityContext.runAsUser | default 10001 }}
        fsGroup: {{ $root.Values.global.security.securityContext.fsGroup | default 10001 }}
      containers:
        - name: {{ $serviceName }}
          securityContext:
            allowPrivilegeEscalation: false
            capabilities:
              drop:
                - ALL
            readOnlyRootFilesystem: false
          image: "{{ $service.image.repository }}:{{ $service.image.tag | default $root.Chart.AppVersion }}"
          imagePullPolicy: {{ $service.image.pullPolicy | default $root.Values.image.pullPolicy }}
          ports:
            {{- range $service.service.ports }}
            - name: {{ .name }}
              containerPort: {{ .targetPort }}
              protocol: TCP
            {{- end }}
          {{- with $service.env }}
          env:
            {{- range . }}
            - name: {{ .name }}
              value: {{ .value | quote }}
            {{- end }}
          {{- end }}
          {{- with $service.resources }}
          resources:
            {{- toYaml . | nindent 12 }}
          {{- end }}
          {{- with $service.livenessProbe }}
          livenessProbe:
            {{- toYaml . | nindent 12 }}
          {{- end }}
          {{- with $service.readinessProbe }}
          readinessProbe:
            {{- toYaml . | nindent 12 }}
          {{- end }}
      {{- with $root.Values.nodeSelector }}
      nodeSelector:
        {{- toYaml . | nindent 8 }}
      {{- end }}
      {{- with $root.Values.affinity }}
      affinity:
        {{- toYaml . | nindent 8 }}
      {{- end }}
      {{- with $root.Values.tolerations }}
      tolerations:
        {{- toYaml . | nindent 8 }}
      {{- end }}
{{- end -}}
