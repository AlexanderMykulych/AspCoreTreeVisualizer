import { CharacteristicValue } from "./CharacteristicValue";

export interface Characteristic {
	Name: string;
	Values: Array<CharacteristicValue>;
}