@ECHO OFF
ECHO Start k8s.
ECHO CLAER ALL.

kubectl apply -f istio-crds.yaml
kubectl apply -f istio-demo.yaml

kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml

kubectl apply -f gateway.yaml
kubectl apply -f virtualservice-single.yaml

kubectl get pod -o wide