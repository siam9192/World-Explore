import app from "./app.js";
import { env } from "./config/env.js";
import prisma from "./lib/prisma.js";

const server = app.listen(env.PORT, () => {
  console.info(`WorldExplore API listening on port ${env.PORT}.`);
});

async function shutdown(signal: string) {
  console.info(`${signal} received; shutting down the API.`);

  server.close(async (error) => {
    if (error) {
      console.error("Failed to close the HTTP server cleanly:", error);
      process.exitCode = 1;
    }

    await prisma.$disconnect();
    process.exit();
  });
}

process.once("SIGINT", () => void shutdown("SIGINT"));
process.once("SIGTERM", () => void shutdown("SIGTERM"));
