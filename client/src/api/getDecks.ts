import { API_URL } from "./config";
import { TDeck } from "./types";

export async function getDecks(): Promise<TDeck[]> {
	const response = await fetch(`${API_URL}/decks`);
	return response.json();
}
