import { CharacteristicValue } from "./CharacteristicValue";


export interface IRole
{
	Name: string;
	Required?: boolean;
	DefaultValue?: CharacteristicValue;
}