import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const server = express();
const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`🚀 Travel Weather API running on port ${PORT}`);
    console.log(`🔗 http://localhost:${PORT}`);
});