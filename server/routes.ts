import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRsvpSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // RSVP endpoint
  app.post("/api/rsvp", async (req, res) => {
    try {
      const data = insertRsvpSchema.parse(req.body);
      const rsvp = await storage.createRsvp(data);
      res.status(201).json({ message: "RSVP received successfully", rsvp });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: "Failed to process RSVP" });
      }
    }
  });

  // Get all RSVPs for admin purposes
  app.get("/api/rsvps", async (req, res) => {
    try {
      const rsvps = await storage.getAllRsvps();
      res.status(200).json(rsvps);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve RSVPs" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
