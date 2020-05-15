const Server = require("../src/application");

const app = new Server();

// app.use(async (ctx, next) => {
//   ctx.body = "1";
//   setTimeout(() => {
//     ctx.body += "0";
//   }, 1000);
//   await next();
//   ctx.body += "5";
// });

// app.use(async (ctx, next) => {
//   ctx.body += "2";
//   await sleep();
//   await next();
//   ctx.body += "4";
// });

// app.use(async (ctx, next) => {
//   ctx.body += "3";
// });

app.use(async (ctx, next) => {
  let url = ctx.url;
  console.log(url);
  if (url === "/await") {
    let timeout = 10000;
    await sleep(timeout);
    ctx.body = `await ${timeout}\n${new Date()}`;
    next();
  } else {
    ctx.body = `hello koa\n${new Date()}`;
    next();
  }
});

function sleep(ms = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

app.listen(3000);
