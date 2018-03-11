import { ActionContext, Store } from "vuex";
import { getStoreAccessors } from "vuex-typescript";
import { BasePoint } from "./BasePoint";

export interface Graph {
	Name: string;
	Start: BasePoint;
}