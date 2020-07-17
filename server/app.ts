import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const PORT = 8080;

const transactions = [
  {
    date: new Date("7-1-2020").toLocaleDateString(),
    payee: "Us",
    category: "Salary",
    notes: "",
    outflow: "",
    inflow: 4115.12,
    balance: 4115.12,
  },
];

const router = new Router();

router
  .get("/", (context) => {
    context.response.body = "Hello world!";
  })
  .get("/transactions", (context) => {
    context.response.body = Array.from(transactions);
  });

const app = new Application();

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${hostname ??
      "localhost"}:${port}`,
  );
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: PORT });
