import { Graph } from "./Graph";
import { Characteristic } from "./Characteristic";
import { IRole } from "./Role";

export interface RootState {
	Graphs: Array<Graph>;
	Characteristics: Array<Characteristic>;
	Roles: Array<IRole>;
}