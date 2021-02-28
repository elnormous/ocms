const Server = require("./Server.js")

const hostname = process.env.OCMS_HOSTNAME || "localhost";
const port = (process.env.OCMS_PORT !== undefined) ? parseInt(process.env.OCMS_PORT) : 8080;

const databaseDriver = process.env.OCMS_DATABASE_DRIVER || "postgres";
const databaseHostname = process.env.OCMS_DATABASE_HOSTNAME || "localhost";
const databasePort = (process.env.OCMS_DATABASE_PORT !== undefined) ? parseInt(process.env.OCMS_DATABASE_PORT) : 5432;
const databaseName = process.env.OCMS_DATABASE_NAME || "ocms";
const databaseUsername = process.env.OCMS_DATABASE_USERNAME || "";
const databasePassword = process.env.OCMS_DATABASE_PASSWORD || "";

try {
    const server = new Server(
        databaseDriver,
        databaseHostname,
        databasePort,
        databaseName,
        databaseUsername,
        databasePassword
    );
    server.run(hostname, port);
} catch (e) {
    console.error(e.name + ":", e.message);
}
