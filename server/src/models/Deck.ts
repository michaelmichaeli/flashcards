import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// const CardSchema = new Schema({
// 	front: String,
// 	back: String
// });

const DeckSchema = new Schema({
	title: String,
	// cards: CardSchema[],
});

const DeckModel = mongoose.model("Deck", DeckSchema);

export default DeckModel;
