import { Graph } from "./Graph";
import { Characteristic } from "./Characteristic";

export interface RootState {
	Graphs: Array<Graph>;
	Characteristics: Array<Characteristic>
}