import type { Request, Response } from "express";
import { Rule } from "../models/rule-model.ts";

export const getRules = async (req: Request, res: Response) => {
  try {
    const rules = await Rule.find({});
    res.status(200).json({ type: "rules", data: rules });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "failed to get rules", error });
  }
};

export const createRule = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    if (!data._id) {
      const rule = await Rule.create(data);
      await rule.save();
    } else {
      await Rule.findOneAndUpdate({ _id: data._id }, data, {
        new: true,
      });
    }
    res.status(200).json({ type: "rules", message: "rule created/updated" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "failed to create/update rule", error });
  }
};
