import { createDB } from "./database.js";

async function initializeDatabase() {
  try {
    await createDB();
    console.log("Database schema and tables created successfully");
  } catch (error) {
    console.error("Error creating database schema and tables:", error);
    process.exit(1);
  }
}

initializeDatabase();
