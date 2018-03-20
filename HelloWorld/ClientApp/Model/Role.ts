import { CharacteristicValue } from "./CharacteristicValue";


export interface IRole
{
	Id: string;
	Name: string;
	Required?: boolean;
	DefaultValue?: CharacteristicValue;
}