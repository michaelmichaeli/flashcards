require("dotenv").config();

import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Deck from "./models/Deck";

const PORT = 5000;

const app = express();
app.use(express.json());

app.post("/decks", async (req: Request, res: Response) => {
	console.log(req.body);

	const newDeck = new Deck({
		title: req.body.title,
		name: req.body.name,
	});
	const createdDeck = await newDeck.save();
	res.json(createdDeck);
});

mongoose.connect(process.env.MONGO_URL!).then(() => {
	console.log("listening to port ", PORT);
});

app.listen(PORT);
