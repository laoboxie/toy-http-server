# toy-http-server

一个基于 nodejs 的 HTTP 服务器玩具，也是一个最简版的 KOA。

## 关于单线程的疑问

我一直存在一个疑问，就是 nodejs 是单线程的，那么如果一个请求阻塞了，那么其他新进来的请求是否会被阻塞？

经过测试（测试文件：/test/koa-await.js），一个请求阻塞了的话，新进来的请求是不会被阻塞的。

## 关于 KOA

粗略地阅读了 KOA2 的源码，核心源码行数 1800+，其核心的文件有四个：
|--lib
|--application.js
|--context.js
|--request.js
|--response.js
