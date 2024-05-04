require("dotenv").config();

import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";

import Deck from "./models/Deck";
import { getDecksController } from "./controllers/getDecks";
import { createDeckController } from "./controllers/createDeck";
import { deleteDeckController } from "./controllers/deleteDeck";
import { createCardForDeckController } from "./controllers/createCardForDeck";
import { getDeckController } from "./controllers/getDeck";
import { deleteCardOnDeckController } from "./controllers/deleteCardOnDeck";

const PORT = 5000;

const app = express();
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));
app.use(express.json());

app.get("/decks", getDecksController);
app.post("/decks", createDeckController);
app.delete("/decks/:deckId", deleteDeckController);
app.post("/decks/:deckId/cards", createCardForDeckController);
app.get("/decks/deckId", getDeckController);
app.delete("/decks/:deckId/cards/:index", deleteCardOnDeckController);

app.put("/decks/:id", async (req: Request, res: Response) => {
	const deck = await Deck.findByIdAndUpdate(req.params.id, {
		title: req.body.title,
	});
	res.json(deck);
});

app.get("/decks/:id", async (req: Request, res: Response) => {
	const deck = await Deck.findById(req.params.id);
	res.json(deck);
});

app.post("/decks/:id/cards", async (req: Request, res: Response) => {
	const deck = await Deck.findById(req.params.id);
	const newCard = {
		question: req.body.question,
		answer: req.body.answer,
	};
	// deck.cards.push(newCard);
	// await deck.save();
	res.json(deck);
});

app.delete("/decks/:id/cards/:cardId", async (req: Request, res: Response) => {
	const deck = await Deck.findById(req.params.id);
	// deck.cards.id(req.params.cardId).remove();
	// await deck.save();
	res.json(deck);
});

app.put("/decks/:id/cards/:cardId", async (req: Request, res: Response) => {
	const deck = await Deck.findById(req.params.id);
	// deck.cards.id(req.params.cardId).updateOne({
	// 	question: req.body.question,
	// 	answer: req.body.answer,
	// });
	// await deck.save();
	res.json(deck);
});

app.get("/decks/:id/cards/:cardId", async (req: Request, res: Response) => {
	const deck = await Deck.findById(req.params.id);
	// const card = deck.cards.id(req.params.cardId);
	// res.json(card);
});

mongoose.connect(process.env.MONGO_URL!).then(() => {
	console.log("listening to port ", PORT);
});

app.listen(PORT);
