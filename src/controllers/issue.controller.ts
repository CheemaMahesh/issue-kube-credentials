import { Request, Response } from "express";
import { prisma } from "../prisma";
import {
  CREDENTIAL_ALREADY_EXISTS,
  INTERNAL_SERVER_ERROR,
} from "../utils/messages";
import { issueValidation } from "../validations/issue";

export const issueCredential = async (req: Request, res: Response) => {
  try {
    const { name, credentialId } = req.body;

    // -----------------------------Validations
    const validated = issueValidation(name, credentialId);
    if (!validated.success) {
      res.status(400).json({ message: validated.message });
      return;
    }

    // -----------------------------Check if credential already exists
    const existingCredential = await prisma.credential.findFirst({
      where: { credentialId, name },
    });
    if (existingCredential) {
      res.status(400).json({ message: CREDENTIAL_ALREADY_EXISTS });
      return;
    }

    // -----------------------------Create credential
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
    res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
};
