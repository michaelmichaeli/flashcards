import { useEffect, useState } from "react";
import { createCard } from "./api/createCard";
import { useParams } from "react-router-dom";
import { getDeck } from "./api/getDeck";
import { TDeck } from "./api/types";
import { deleteCard } from "./api/deleteCard";

export default function Deck() {
	const { deckId } = useParams();
	const [deck, setDeck] = useState<TDeck | undefined>();
	const [cards, setCards] = useState<string[]>([]);
	const [text, setText] = useState<string>("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { cards: serverCards } = await createCard(deckId!, text);
		setCards(serverCards);
		setText("");
	};

	const handlerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
	};

	const handleDeleteCard = async (index: number) => {
		if (!deckId) return;
		const newDeck = await deleteCard(deckId, index);
		setCards(newDeck.cards);
	};

	useEffect(() => {
		const fetchDeck = async () => {
			if (!deckId) return;
			const newDeck = await getDeck(deckId);
			setDeck(newDeck);
			setCards(newDeck.cards)
		};
		fetchDeck();
	}, [deckId]);

	return (
		<>
			<h1>{deck?.title}</h1>
			<ul className="cards">
				{cards.map((card, index) => (
					<li className="deck" key={index}>
						<h2>{card}</h2>
						<div className="actions">
							<button onClick={() => handleDeleteCard(index)}>Delete</button>
							<button>Edit</button>
							<button>Add Card</button>
						</div>
					</li>
				))}
			</ul>
			<form onSubmit={handleSubmit}>
				<label htmlFor="card-text">Card Text</label>
				<input
					type="text"
					name="card-text"
					onChange={handlerInputChange}
					value={text}
				/>
				<button type="submit">Create Card</button>
			</form>
		</>
	);
}
