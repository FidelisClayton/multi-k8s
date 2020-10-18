docker build -t fidelisclayton/multi-client:latest -t fidelisclayton/multi-client:$SHA -f ./client/Dockerfile ./client
docker build -t fidelisclayton/multi-server:latest -t fidelisclayton/multi-server:$SHA -f ./server/Dockerfile ./server
docker build -t fidelisclayton/multi-worker:latest -t fidelisclayton/multi-worker:$SHA -f ./worker/Dockerfile ./worker

docker push fidelisclayton/multi-client:latest
docker push fidelisclayton/multi-worker:latest
docker push fidelisclayton/multi-server:latest

docker push fidelisclayton/multi-client:$SHA
docker push fidelisclayton/multi-server:$SHA
docker push fidelisclayton/multi-worker:$SHA

kubectl apply -f k8s

kubectl set image deployments/server-deployment server=fidelisclayton/multi-server:$SHA
kubectl set image deployments/client-deployment client=fidelisclayton/multi-client:$SHA
kubectl set image deployments/worker-deployment worker=fidelisclayton/multi-worker:$SHA
