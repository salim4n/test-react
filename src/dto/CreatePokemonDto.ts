import Attacks from "./Attacks";

export default interface CreatePokemonDto {
	name: string;
	type: string;
	lifepoints: number;
	imageUrl: string;
	attacks: Attacks[];
}
