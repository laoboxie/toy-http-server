const Koa = require("koa");
const app = new Koa();

app.use(async (ctx) => {
  let url = ctx.url;
  console.log(url);
  if (url === "/await") {
    let timeout = 10000;
    await sleep(timeout);
    ctx.body = `await ${timeout}\n${new Date()}`;
  } else {
    ctx.body = `hello koa\n${new Date()}`;
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
