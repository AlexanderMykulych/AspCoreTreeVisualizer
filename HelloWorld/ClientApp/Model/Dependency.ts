import { IRole } from "./Role";
import { BasePoint } from "./BasePoint";

export interface Dependency {
	Start: BasePoint,
	Name: string; 
	Label?: string;
	End: BasePoint;
	Roles?: Array<IRole>;
}