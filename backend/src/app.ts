import fastify, { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import { encryptResponse, decryptResponse } from './utils/encryption';

import irysRoutes from './routes/irys.routes';

const app = fastify()
require('dotenv').config();

// Get allowed origins from environment variable
const allowedOrigins = process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',') 
    : ['http://localhost:5000', 'http://localhost:3000'];

// Add the IP addresses to the allowed origins if they aren't already included
if (!allowedOrigins.includes('http://192.168.1.126:5000')) {
    allowedOrigins.push('http://192.168.1.126:5000');
}
if (!allowedOrigins.includes('http://192.168.1.126:3000')) {
    allowedOrigins.push('http://192.168.1.126:3000');
}

console.log('CORS Allowed Origins:', allowedOrigins);

app.register(helmet);
app.register(cors, {
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'x-api-key', 'Authorization', 'Access-Control-Allow-Origin', 'Origin', 'Accept'],
    exposedHeaders: ['Content-Length', 'Content-Type'],
    maxAge: 86400, // 24 hours
    preflightContinue: false,
    optionsSuccessStatus: 204
});

const validateApiKey = async (request : any, reply : any) => {
    // Skip API key validation for preflight OPTIONS requests
    if (request.method === 'OPTIONS') {
        return;
    }
    
    // Skip API key validation for the root path
    if (request.url === '/') {
        return;
    }
    
    // Check if API key header exists
    if (!request.headers['x-api-key']) {
        console.log('Missing API key header');
        return reply.code(401).send({ state: 'error', message: 'Unauthorized - Missing API Key' });
    }
    
    const apiKeyRequest = decryptResponse(request.headers['x-api-key']);
    if (apiKeyRequest.state === 'error') {
        console.log('API key decryption failed');
        return reply.code(401).send({ state: 'error', message: 'Unauthorized - Invalid API Key' });
    }

    const apiKey = apiKeyRequest.response;
    if (!apiKey || apiKey !== process.env.API_KEY) {
        console.log('API key validation failed');
        return reply.code(401).send({ state: 'error', message: 'Unauthorized - Invalid API Key' });
    }
};



app.register(async function(fastify : FastifyInstance) {
   // app.addHook('preHandler', validateApiKey);
    app.register(irysRoutes, { prefix: '/irys' })
})

// Diagnostic endpoint for CORS testing
app.get('/cors-test', async (request, reply) => {
    
    return reply.send({ 
        message: 'CORS is working correctly!',
        requestHeaders: request.headers,
        allowedOrigins: allowedOrigins,
        yourOrigin: request.headers.origin || 'Not provided'
    });
});

app.get('/', async (request, reply) => {
    reply.send({ message: 'Hello World' })
})

app.setErrorHandler((error, request, reply) => {
    console.log(error);
    reply.status(500).send({ error: 'Something went wrong!' });
});

const start = async () => {
    try {
        const PORT = process.env.PORT || 5000;
        await app.listen({ port: parseInt(PORT as string), host : '0.0.0.0' });
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

start();