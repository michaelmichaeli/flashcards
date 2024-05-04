import { Request, Response } from "express";
import Deck from "../models/Deck";

export async function deleteDeckController(req: Request, res: Response) {
	const deck = await Deck.findByIdAndDelete(req.params.deckId);
	res.json(deck);
}