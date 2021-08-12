# miljø

[mcn](https://gitlab.com/cxss/mcn) but better


* __gateway__: API / storage (TS, FQL)
* __cli__: User interface (Go)
* __edge__: Hardware code (Rust)


here's laundry list of things i want:

* go cli interface using bubbletea & lipgloss
* serverless "backend" using faunadb & graphql
* edge nodes in rust using rpi pico & micro:bit

i figure i can write these in order of which i should learn first;

* serverless part first to lay the foundations (+ i need to learn FQL for my new job :0)
* bubbletea + go cuz that library is shmexy
* rust because i'm not a huge fan of c - plus i need a reason use my micro:bit thats been collecting dust for forever

inversion of control for commanding devices

instead of thinking of devices as something unique & announcable (e.g. hello network i'm `some_device_v23.1`) with its own pre-defined schema of outputs (e.g. light controller), devices are dumb endpoints that can parse a schema and perform some action as a result - that way you don't need to re-write some C code, flash the device & whatever to get new functionality - it just consooms

```
              cli (go + bubbletea) 
               |
               v
 fauna <--> serverless (typescript + graphql)
               ^
               |
            rabbitmq
           /   |    \
          v    |     v
      device   v    device (rust + rpi pico/micro:bit)
            device
```


