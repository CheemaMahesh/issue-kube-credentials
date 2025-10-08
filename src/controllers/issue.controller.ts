import { Request, Response } from "express";
import { prisma } from "../prisma";

export const issueCredential = async (req: Request, res: Response) => {
  try {
    const { name, credentialId } = req.body;

    if (!name || !credentialId) {
      res.status(400).json({ message: "Name and credentialId are required" });
      return;
    }
    const existingCredential = await prisma.credential.findFirst({
      where: { credentialId, name },
    });
    if (existingCredential) {
      res.status(400).json({ message: "Credential already exists" });
      return;
    }

    const workerId = `worker-${Math.floor(Math.random() * 3) + 1}`;
    const credential = await prisma.credential.create({
      data: { name, credentialId, workerId },
    });

    res.status(201).json({
      message: `Credential issued by ${workerId}`,
      credential,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
