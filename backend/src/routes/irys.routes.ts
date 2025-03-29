import { FastifyInstance } from "fastify";
import { uploadIrysAPI, retrieveIrysAPI, updateIrysAPI } from "../controllers/irys.controller";

export default async function irysRoutes(fastify: FastifyInstance) {
    fastify.post('/upload', uploadIrysAPI);
    fastify.get('/retrieve', retrieveIrysAPI);
    fastify.post('/update', updateIrysAPI);
}