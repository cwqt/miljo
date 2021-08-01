# miljø

[mcn](https://gitlab.com/cxss/mcn) but better in every way.

restriction inspires creativity, so here's laundry list of things i want:

* go cli interface with charm.sh
* serverless event-driven typescript with prisma & graphql
* gateway nodes in go & rabbitmq

inversion of control for commanding devices

instead of thinking of devices as something unique & announcable (e.g. hello network i'm `some_device_v23.1`) with its own pre-defined schema of outputs (e.g. light controller), devices are dumb endpoints that can parse a schema and perform some action as a result - that way you don't need to re-write some C code, flash the device & whatever to get new functionality

```
  (users)
 prisma <--> serverless <--> svelte
               |
            ------- nat
  (jobs)       |
 prisma <--> gateway <-----> svelte
               |
            rabbitmq
           /   |    \
          v    |     v
      device   v    device
            device
```


