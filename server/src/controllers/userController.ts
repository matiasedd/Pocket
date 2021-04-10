import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { hashSync } from "bcrypt";
import database from "../database";

const user = {
  listAll: async (_req: Request, res: Response) => {
    const query = await database("users");
    res.json(query);
  },
  listUser: async (req: Request, res: Response) => {
    const { userid } = req.params;
    const query = await database("users").where("id", userid);
    res.json(query);
  },
  add: async (req: Request, res: Response) => {
    let { password } = req.body;

    const id = uuidv4();
    password = hashSync(password, password.length);

    try {
      await database("users").insert({ ...req.body, id, password });
      res.sendStatus(201);
    } catch (err) {
      res.send(err);
    }
  },
  update: async (req: Request, res: Response) => {
    const { userid } = req.params;
    try {
      await database("users").where("id", userid).update(req.body);
      res.sendStatus(200);
    } catch (err) {
      res.send(err);
    }
  },
  delete: async (req: Request, res: Response) => {
    const { userid } = req.params;
    try {
      await database("users").where("id", userid).del();
      res.sendStatus(200);
    } catch (err) {
      res.send(err);
    }
  },
};

export default user;
