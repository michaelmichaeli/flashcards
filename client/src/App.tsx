import { useEffect, useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { deleteDeck } from "./api/deleteDeck";
import { Deck, getDecks } from "./api/getDecks";
import { createDeck } from "./api/createDeck";

function App() {
	const [decks, setDecks] = useState<Deck[]>([]);
	const [title, setTitle] = useState<string>("");

	const handlerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const deck = await createDeck(title);
		setDecks([deck, ...decks]);
		setTitle("");
	};

	const handleDeleteDeck = async (deckId: string) => {
		await deleteDeck(deckId);
		setDecks(decks.filter((deck) => deck._id !== deckId));
	};

	useEffect(() => {
		const fetchDeck = async () => {
			const newDecks = await getDecks();
			setDecks(newDecks);
		};
		fetchDeck();
	}, []);

	return (
		<>
			<ul className="decks">
				{decks.map((deck) => (
					<li className="deck" key={deck._id}>
						<Link to={`/deck/${deck._id}`}>
							<h2>{deck.title}</h2>
						</Link>
						<div className="actions">
							<button onClick={() => handleDeleteDeck(deck._id)}>Delete</button>
							<button>Edit</button>
							<button>Add Card</button>
						</div>
					</li>
				))}
			</ul>
			<form onSubmit={handleSubmit}>
				<label htmlFor="title">Deck Title</label>
				<input
					type="text"
					name="title"
					onChange={handlerInputChange}
					value={title}
				/>
				<button type="submit">Create Deck</button>
			</form>
		</>
	);
}

export default App;
