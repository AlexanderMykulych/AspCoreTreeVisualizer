import { ActionContext, Store } from "vuex";
import { getStoreAccessors } from "vuex-typescript";
import { BasePoint } from "./BasePoint";
import { Dependency } from "./Dependency";

export interface Graph {
	Name: string;
	Points: Array<BasePoint>;
	Dependencies: Array<Dependency>;
}