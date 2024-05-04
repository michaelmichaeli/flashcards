import { Request, Response } from "express";
import Deck from "../models/Deck";

export async function getDeckController(req: Request, res: Response) {
	const deck = await Deck.findById(req.params.deckId);
	res.json(deck);
}