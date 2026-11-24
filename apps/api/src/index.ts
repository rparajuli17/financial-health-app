import Fastify from "fastify";
import { formatCents } from "@fha/engines";
import { prisma } from "./db";

const app = Fastify({ logger: true });

app.get("/health", async () => {
  const ping = await prisma.ping.create({ data: {} });
  const totalPings = await prisma.ping.count();
  return {
    status: "ok",
    service: "fha-api",
    enginesCheck: formatCents(12345),
    db: { latestPingId: ping.id, totalPings },
    timestamp: new Date().toISOString(),
  };
});

const start = async () => {
  try {
    await app.listen({ port: 3001, host: "0.0.0.0" });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

