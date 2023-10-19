import React, { useState, useEffect } from "react";
import { Pokemon } from "../dto";

function Jeux() {
	const [numberOfBattles, setNumberOfBattles] = useState<number | null>(null);
	const [cards, setCards] = useState<Pokemon[]>([]);
	const [playerCards, setPlayerCards] = useState<Pokemon[]>([]);
	const [opponentCards, setOpponentCards] = useState<Pokemon[]>([]);

	const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
		null,
	);

	useEffect(() => {
		// Utilisez cette URL pour récupérer tous les pokémons.
		const apiUrl = "https://api-pokemon.webexpr10.ovh/api/v1/pokemons";

		// Effectuez une requête HTTP pour récupérer les données.
		fetch(apiUrl)
			.then((response) => response.json())
			.then((data) => {
				// Gérez les données récupérées ici.
				const pokemonData: Pokemon[] = data.slice(0, 6); // On récupère les 6 premiers Pokémon.

				// Mélangez les cartes de manière aléatoire.
				const shuffledCards = pokemonData.sort(() => Math.random() - 0.5);

				setCards(shuffledCards);
			})
			.catch((error) => {
				console.error(
					"Erreur lors de la récupération des données de l'API :",
					error,
				);
			});
	}, []);

	const handleStartGame = () => {
		if (numberOfBattles !== null && numberOfBattles > 0) {
			// Assurez-vous que le nombre de combats est valide.
			// Vous pouvez récupérer les données des cartes de Pokémon ici.
			// Mélangez les cartes de manière aléatoire.
			// Répartissez les cartes entre le joueur et l'adversaire.
		} else {
			console.error("Le nombre de combats doit être supérieur à zéro.");
		}
	};

	const handleCardClick = (cardIndex: number) => {
		// Gérez le clic sur une carte.
	};

	return (
		<div>
			{numberOfBattles === null ? (
				<>
					<h2>Jeux</h2>
					<input
						type="number"
						placeholder="Nombre de combats"
						onChange={(e) => setNumberOfBattles(parseInt(e.target.value, 10))}
					/>

					<button onClick={handleStartGame}>Démarrer la partie</button>
				</>
			) : (
				<>
					<h2>Jeux en cours</h2>
					<div className="card-container">
						{cards.map((card, index) => (
							<div
								key={index}
								className={`card ${card.isFlipped ? "flipped" : ""}`}
								onClick={() => handleCardClick(index)}>
								<img src={card.imageUrl} alt={card.name} />
								<p>Nom: {card.name}</p>
								<p>Type: {card.type}</p>
								<p>Points de vie: {card.lifepoints}</p>
								<p>Attaques:</p>
								<ul>
									{card.attacks.map((attack, i) => (
										<li key={i}>
											{attack.name} - Dégâts: {attack.damage}
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
}

export default Jeux;
