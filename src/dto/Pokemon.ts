import Attacks from "./Attacks";

export interface Pokemon {
	name: string;
	type: string;
	lifepoints: number;
	imageUrl: string;
	attacks: Attacks[];
	isFlipped: boolean;
}
