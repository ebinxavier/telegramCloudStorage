import env from "dotenv";
env.config();

import { connect } from "./database/database";

import { startAPIServer } from "./apis/apis";

// Connecting to MongoDB before all operations.
connect();
// Start Express Server
const app = startAPIServer();
export default app;
