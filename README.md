# miljø

[mcn](https://gitlab.com/cxss/mcn) but better in every way.

* gateway nodes in rust, with their own rabbitmq
* serverless event-driven typescript backend with prisma & graphql
* angular frontend

inversion of control for commanding devices

```
  (users)
 prisma <--> serverless <--> angular
               |    \
               |   pub-sub
  (jobs)       |    /
 prisma <--> gateway
               |
            rabbitmq
           /   |    \
          v    |     v
      device   v    device
            device
```
