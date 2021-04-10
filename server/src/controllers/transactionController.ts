import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import database from "../database";

export const transaction = {
  listAll: async (req: Request, res: Response) => {
    const { userid } = req.params;
    const { type } = req.query;

    let query;

    switch (type) {
      case "incomes":
        query = await database("transactions")
          .where({
            user_id: userid,
            type: "income",
          })
          .orderBy("created_at", "desc");
        break;
      case "expenses":
        query = await database("transactions")
          .where({
            user_id: userid,
            type: "expense",
          })
          .orderBy("created_at", "desc");
        break;
      case "balance":
        query = await database("transactions")
          .where("user_id", userid)
          .sum("value");
        break;
      case "sumincomes":
        query = await database("transactions")
          .where({
            user_id: userid,
            type: "income",
          })
          .sum("value");
        break;
      case "sumexpenses":
        query = await database("transactions")
          .where({
            user_id: userid,
            type: "expense",
          })
          .sum("value");
        break;
      default:
        query = await database("transactions")
          .where("user_id", userid)
          .orderBy("created_at", "desc");
    }

    res.json(query);
  },
  listTransaction: async (req: Request, res: Response) => {
    const { transactionid } = req.params;
    const query = await database("transactions").where("id", transactionid);
    res.json(query);
  },
  add: async (req: Request, res: Response) => {
    const { userid } = req.params;
    const id = uuidv4();

    try {
      await database("transactions")
        .where("id", userid)
        .insert({ ...req.body, id });
      res.sendStatus(201);
    } catch (err) {
      res.send(err);
    }
  },
  update: async (req: Request, res: Response) => {
    const { userid, transactionid } = req.params;
    try {
      await database("transactions")
        .where({ user_id: userid, id: transactionid })
        .update(req.body);
      res.sendStatus(200);
    } catch (err) {
      res.send(err);
    }
  },
  delete: async (req: Request, res: Response) => {
    const { userid, transactionid } = req.params;
    try {
      await database("transactions")
        .where({ user_id: userid, id: transactionid })
        .del();
      res.sendStatus(200);
    } catch (err) {
      res.send(err);
    }
  },
};

export default transaction;
