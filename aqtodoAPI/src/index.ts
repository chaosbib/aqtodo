import * as http from "http";
import App from "./app";

const port = process.env.PORT || 8181;

App.set("port", port);
const server = http.createServer(App);
server.listen(port);


server.on("listening", function(): void {
  const addr = server.address();
  const bind = (typeof addr === "string") ? `pipe ${addr}` : `port ${port}`;
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
 });

module.exports = App;