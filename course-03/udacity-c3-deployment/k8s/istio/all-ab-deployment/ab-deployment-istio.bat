@ECHO OFF
ECHO Start k8s.
ECHO CLAER ALL.

kubectl delete daemonsets,replicasets,services,deployments,pods,rc --all 
kubectl delete secret/env-secret
kubectl delete secret/aws-secret
kubectl delete configmap/env-config

kubectl apply -f aws-secret.yaml
kubectl apply -f env-configmap.yaml
kubectl create secret generic env-secret --from-literal=POSTGRESS_USERNAME=UdacityFirstDB --from-literal=POSTGRESS_PASSWORD=UdacityFirstDB

kubectl apply -f backend-feed-deployment.yaml
kubectl apply -f backend-feed-service.yaml

kubectl apply -f backend-user-deployment.yaml
kubectl apply -f backend-user-service.yaml

kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml
kubectl apply -f frontend-deployment-v2.yaml
kubectl apply -f frontend-service-v2.yaml
kubectl apply -f frontend-gateway.yaml
kubectl apply -f frontend-virtualservice.yaml

kubectl apply -f reverseproxy-deployment.yaml
kubectl apply -f reverseproxy-service.yaml
REM kubectl apply -f reverseproxy-gateway.yaml
REM kubectl apply -f reverseproxy-virtualservice.yaml

kubectl get pod -o wide