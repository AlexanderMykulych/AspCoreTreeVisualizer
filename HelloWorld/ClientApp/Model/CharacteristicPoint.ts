import { BasePoint } from "./BasePoint";
import { Characteristic } from "./Characteristic";
import { CharacteristicValue } from "./CharacteristicValue";

export interface CharacteristicPoint extends BasePoint {
	Characteristic: Characteristic;
	Values: Array<CharacteristicValue>;
	Required?: boolean;
	DefaultValue?: CharacteristicValue;
}