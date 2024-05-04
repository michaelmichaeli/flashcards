import { Request, Response } from "express";
import Deck from "../models/Deck";

export async function createCardForDeckController(req: Request, res: Response) {
	const deck = await Deck.findById(req.params.deckId);
	if (!deck) {
		return res.status(404).json({ message: "Deck not found" });
	}

	deck.cards.push(req.body.text);
	await deck.save();
	res.json(deck);
}
