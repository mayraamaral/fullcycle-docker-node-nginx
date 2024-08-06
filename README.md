# Docker module
Docker module's challenge solution from Full Cycle course.  
  
> [!IMPORTANT]  
> The first time you run, you may face a 502 error page, it is because Node container will be waiting the
data base init. Wait approximately 20-30 seconds and refresh the page. You will see the results!  
  
## How to test it
Run the below code and access localhost at port 8080 to see the results :)
```shell
docker compose up -d
```
  
To get the containers down, just run:
```shell
docker compose down -v
```
## References
- Full Cycle course;
- [Dockerize](https://github.com/jwilder/dockerize);
- [LogRocket blog](https://blog.logrocket.com/how-to-run-node-js-server-nginx/);
