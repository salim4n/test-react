import { useState } from "react";
import { Attacks, CreatePokemonDto } from "../dto";

//desolé pour ce composant je voulais faire un truc plus propre mais j'ai pas eu le temps
const CreatePokemonForm: React.FC = () => {
	//etat du formulaire
	const [formData, setFormData] = useState<CreatePokemonDto>({
		name: "",
		type: "",
		lifepoints: 0,
		imageUrl: "",
		attacks: [],
	});

	//gestion des changements dans les inputs
	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	//ajout d'une attaque
	const handleAddAttack = () => {
		const newAttack: Attacks = {
			name: "",
			damage: 0,
		};
		setFormData({
			...formData,
			attacks: [...formData.attacks, newAttack],
		});
	};

	//gestion des changements dans les inputs des attaques
	const handleAttackChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number,
	) => {
		const { name, value } = e.target;
		const updatedAttacks = [...formData.attacks];
		updatedAttacks[index] = {
			...updatedAttacks[index],
			[name]: value,
		};
		setFormData({
			...formData,
			attacks: updatedAttacks,
		});
	};

	//soumission du formulaire
	const handleFormSubmit = () => {
		if (
			formData.name &&
			formData.type &&
			formData.lifepoints &&
			formData.imageUrl &&
			formData.attacks.length > 0
		) {
			//TODO: cacher l'url dotenv
			const url = "https://api-pokemon.webexpr10.ovh/api/v1/pokemons";

			// Préparez les données à envoyer à l'API.
			const requestData = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			};

			// Envoie les données à l'API.
			fetch(url, requestData)
				.then((response) => {
					if (!response.ok) {
						throw new Error("Erreur lors de la requête");
					}
					return response.json();
				})
				.then((data) => {
					// API Reponse
					console.log("Pokémon ajouté avec succès :", data);
					// Je vide le formulaire
					setFormData({
						name: "",
						type: "",
						lifepoints: 0,
						imageUrl: "",
						attacks: [],
					});
				})
				.catch((error) => {
					// Gérez les erreurs de l'API
					console.error("Erreur lors de l'ajout du Pokémon :", error);
				});
		} else {
			//En cas de data invalide
			console.error("Veuillez remplir tous les champs obligatoires.");
		}
	};

	return (
		<div>
			<h2>Ajouter un Pokémon</h2>
			<form>
				<div>
					<label>Nom :</label>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label>Type :</label>
					<select
						name="type"
						value={formData.type}
						onChange={handleInputChange}>
						<option value="">Sélectionnez un type</option>
						<option value="feu">Feu</option>
						<option value="foudre">Foudre</option>
						<option value="herbe">Herbe</option>
						<option value="eau">Eau</option>
					</select>
				</div>
				<div>
					<label>Points de vie :</label>
					<input
						type="number"
						name="lifepoints"
						value={formData.lifepoints}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label>URL de l'image :</label>
					<input
						type="text"
						name="imageUrl"
						value={formData.imageUrl}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<h3>Attaques :</h3>
					{formData.attacks.map((attack, index) => (
						<div key={index}>
							<input
								type="text"
								name="name"
								placeholder="Nom de l'attaque"
								value={attack.name}
								onChange={(e) => handleAttackChange(e, index)}
							/>
							<input
								type="number"
								name="damage"
								placeholder="Dégâts"
								value={attack.damage}
								onChange={(e) => handleAttackChange(e, index)}
							/>
						</div>
					))}
					<button type="button" onClick={handleAddAttack}>
						Ajouter une attaque
					</button>
				</div>
				<button type="button" onClick={handleFormSubmit}>
					Enregistrer
				</button>
			</form>
		</div>
	);
};

export default CreatePokemonForm;
