{{- define "paynext.service" -}}
{{- $serviceName := .serviceName -}}
{{- $service := index .Values.services $serviceName -}}
{{- $root := .root -}}
apiVersion: v1
kind: Service
metadata:
  name: {{ $serviceName }}
  namespace: {{ $root.Values.global.namespace | default $root.Release.Namespace }}
  labels:
    {{- include "paynext.labels" $root | nindent 4 }}
    app.kubernetes.io/component: {{ $serviceName }}
spec:
  type: {{ $service.service.type | default "ClusterIP" }}
  ports:
    {{- range $service.service.ports }}
    - name: {{ .name }}
      port: {{ .port }}
      targetPort: {{ .targetPort }}
      protocol: TCP
      {{- if and (eq $service.service.type "NodePort") .nodePort }}
      nodePort: {{ .nodePort }}
      {{- end }}
    {{- end }}
  selector:
    {{- include "paynext.selectorLabels" $root | nindent 4 }}
    app.kubernetes.io/component: {{ $serviceName }}
{{- end -}}
