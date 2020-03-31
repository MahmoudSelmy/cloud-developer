@ECHO OFF

kubectl apply -f istio-crds.yaml
kubectl apply -f istio-demo.yaml

kubectl label namespace default istio-injection=enabled
kubectl edit svc istio-ingressgateway -n istio-system