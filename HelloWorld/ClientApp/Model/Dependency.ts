import { IRole } from "./Role";

export interface Dependency {
	Start: string,
	Name?: string; 
	End: string;
	Roles?: Array<IRole>;
}