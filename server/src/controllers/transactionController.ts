import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import database from "../database";

export const transaction = {
  listAll: async (req: Request, res: Response) => {
    const { user_id, card_id } = req.params;

    const query = await database("transactions")
      .where({ user_id, card_id })
      .orderBy("created_at", "desc");
    res.json(query);
  },
  listTransaction: async (req: Request, res: Response) => {
    const { transaction_id } = req.params;
    const query = await database("transactions").where({ transaction_id });
    res.json(query);
  },
  add: async (req: Request, res: Response) => {
    const { user_id, card_id } = req.params;
    const transaction_id = uuidv4();

    try {
      await database("transactions")
        .where({ user_id, card_id })
        .insert({ ...req.body, transaction_id });
      res.sendStatus(201);
    } catch (err) {
      res.send(err);
    }
  },
  update: async (req: Request, res: Response) => {
    const { user_id, card_id, transaction_id } = req.params;
    try {
      await database("transactions")
        .where({ user_id, card_id, transaction_id })
        .update(req.body);
      res.sendStatus(200);
    } catch (err) {
      res.send(err);
    }
  },
  delete: async (req: Request, res: Response) => {
    const { user_id, card_id, transaction_id } = req.params;
    try {
      await database("transactions")
        .where({ user_id, card_id, transaction_id })
        .del();
      res.sendStatus(200);
    } catch (err) {
      res.send(err);
    }
  },
};

export default transaction;
