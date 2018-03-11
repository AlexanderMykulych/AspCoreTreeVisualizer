import { Dependency } from "./Dependency";

export interface BasePoint {
	Name: string;
	To: Array<Dependency>;
}