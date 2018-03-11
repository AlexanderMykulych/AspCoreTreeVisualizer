import { Node } from "./Node";
import { Connector } from "./Connector";

export interface SfGraph {
	Name: string,
	Nodes: Array<Node>;
	Connectors: Array<Connector>;
}