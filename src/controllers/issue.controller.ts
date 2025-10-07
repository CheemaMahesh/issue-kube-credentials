import { Request, Response } from "express";

export const issueController = async (req: Request, res: Response) => {
  try {
    const { credentialId, name } = req.body;
    const existisCredential = await Credential.findOne({
      where: {
        credentialId,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
