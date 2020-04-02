@ECHO OFF
ECHO Start k8s.
ECHO CLAER ALL.

kubectl apply -f istio-crds.yaml
kubectl apply -f istio-demo.yaml

kubectl edit svc istio-ingressgateway -n istio-system