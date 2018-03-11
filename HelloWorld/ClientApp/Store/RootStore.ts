import Vue from "vue";
import Vuex from "vuex";
import { RootState } from "../Model/RootState";
import { graphModule as graph } from "./GraphStore";

Vue.use(Vuex);

export const createStore = function () {
	return new Vuex.Store<RootState>({
		modules: {
			graph
		}
	})
};