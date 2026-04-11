import express from "express";
import { env } from "./config/env";
const app = express();
app.get("/", (req, res) => {
    console.log("Testing the app");
});
app.listen(env.PORT, () => {
    `server is running on port ${env.PORT}`;
});
//# sourceMappingURL=index.js.map