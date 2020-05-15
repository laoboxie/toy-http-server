const http = require("http");
const context = require("./context");
const request = require("./request");
const response = require("./response");

class app {
  constructor() {
    this.middlewares = [];
  }

  listen(...argvs) {
    const server = http.createServer(this.createCallbackFn());
    server.listen(...argvs);
  }

  use(middleware) {
    this.middlewares.push(middleware);
    return this;
  }

  createCallbackFn() {
    let fn = this.compose(this.middlewares);

    const handleRequest = async (req, res) => {
      const ctx = this.createContext(req, res);
      fn(ctx)
        .then((res) => {
          ctx.res.end(ctx.body);
        })
        .catch((err) => {
          console.warn(err);
        });
    };
    return handleRequest;
  }

  createContext(req, res) {
    const ctx = Object.create(context);
    ctx.request = Object.create(request);
    ctx.response = Object.create(response);
    ctx.req = ctx.request.req = req;
    ctx.res = ctx.response.res = res;
    return ctx;
  }

  compose(middlewares) {
    return function (ctx) {
      return dispatch(ctx, 0);
      function dispatch(ctx, index) {
        let middleFn = middlewares[index];
        if (middleFn) {
          return Promise.resolve(
            middleFn(ctx, function next() {
              return dispatch(ctx, index + 1);
            })
          );
        } else {
          return Promise.resolve();
        }
      }
    };
  }
}

module.exports = app;
