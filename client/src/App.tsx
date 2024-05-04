import { useEffect, useState } from "react";
import "./App.css";
type Deck = {
	id: string;
	title: string;
};

function App() {
	const [decks, setDecks] = useState<Deck[]>([]);
	console.log("🚀 ~ App ~ deck:", decks);
	const [title, setTitle] = useState<string>("");

	const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await fetch("http://localhost:5000/decks", {
			method: "POST",
			body: JSON.stringify({
				title: title,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		setTitle("");
	};

	useEffect(() => {
		const fetchDeck = async () => {
			const response = await fetch("http://localhost:5000/decks");
			const newDecks = await response.json();
			setDecks(newDecks);
		};
		fetchDeck();
	}, []);

	return (
		<>
			<ul className="decks">
				{decks.map((deck) => (
					<li className="deck" key={deck.id}>
						<h2>{deck.title}</h2>
						<div className="actions">
							<button>Delete</button>
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
					onChange={inputChangeHandler}
					value={title}
				/>
				<button type="submit">Create Deck</button>
			</form>
		</>
	);
}

export default App;
