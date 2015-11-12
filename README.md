# ws-selenium

A thin proxy that translates between websockets and HTTP requests. Though primarily intended to drive Selenium tests (reasons will follow soon), it can be used to send requests to a HTTP server over the websocket protocol.

## Why?

HTTP requests have significant overhead. Opening a connection, sending the headers and then finally your request body. This is pretty much repetitive and wasteful work if you are sending a large number of requests to the same server. Whereas a websocket provides a persistent connection to just send the messages across and recieve the results.

A good candidate for this was Selenium tests. The webdriver protocol requires clients to send HTTP requests to automate the browser for every single task to the **same** host.

## Usage

Modify the `config.json` to update the configurationa according to your needs. Then do:

    node index.js

It will bring the HTTP server up. Now just point your Selenium tests to this URL. A sample script can be found in `examples` directory.

PS: You would need a patched webdriver client library that speaks the websocket protocol. I have patched [WebdriverIO](http://webdriver.io) client library in [this fork](https://github.com/sankha93/webdriverio).

## Benchmark

Just to test how fast this is compared to the normal webdriver HTTP protocol, I created an [ngrok](https://ngrok.com) tunnel to my local ports so that request go via the internet. Then I ran the WebdriverIO's desktop browser's test suite.

Here are the results:

```
Selenium HTTP requests:         9 min 31.68 sec
Selenium over websockets:       5 min 55.63 sec
```

The time save by using ws-selenium is pretty much noticable.
