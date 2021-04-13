import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import database from '../database';

const card = {
  listAll: async (req: Request, res: Response) => {
    const query = await database('cards');
    res.json(query);
  },
  listCard: async (req: Request, res: Response) => {
    const { userd_id, card_id } = req.params;
    const query = await database('cards').where({ card_id, userd_id });
    res.json(query);
  },
  add: async (req: Request, res: Response) => {
    const card_id = uuidv4();
    try {
      await database('cards').insert({ ...req.body, card_id });
      res.sendStatus(201);
    } catch (err) {
      res.send(err);
    }
  },
  delete: async (req: Request, res: Response) => {
    const { user_id, card_id } = req.params;
    try {
      await database('cards').where({ user_id, card_id }).del();
      res.sendStatus(200);
    } catch (err) {
      res.send(err);
    }
  },
};

export default card;
