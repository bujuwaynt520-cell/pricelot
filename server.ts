import express from "express";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const PORT = 3000;

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`> Server running on http://localhost:${PORT}`);
  });
}).catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});
