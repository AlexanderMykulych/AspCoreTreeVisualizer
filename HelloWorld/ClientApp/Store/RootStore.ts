import Vue from "vue";
import Vuex from "vuex";
import { RootState } from "../Model/RootState";
import { graphModule as graph } from "./GraphStore";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
	storage: window.localStorage
})

export const createStore = function () {
	return new Vuex.Store<RootState>({
		modules: {
			graph
		},
		plugins: [vuexLocal.plugin],
		strict: true
	})
};