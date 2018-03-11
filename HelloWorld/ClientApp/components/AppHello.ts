// ClientApp/components/AppHello.ts
import Vue from "vue";
import Vuex from "vuex";
import addDependModalWindow from "./Diagram/AddDependPointWindow";
import CharacteristicDiagram from "./CharacteristicDiagram";
import { createStore } from "../Store/RootStore";
import * as graph from "../Store/GraphStore";


var store = createStore();
export default Vue.extend({
	template: '#app-hello-template',
	store,
	data() {
		return {
			message: "test message"
		};
	},
	computed: {
		diagrams: function () {
			return graph.readGraph(this.$store).map(x => graph.getSyncfusiongGraphByGraph(this.$store)(x));
		}
	},
	methods: {
		addGraph: function () {
			graph.addGraph(this.$store, {
				Name: "Graph" + (graph.readGraphCount(this.$store) + 1),
				Start: null
			});
		}
	},
    components: {
		CharacteristicDiagram,
		addDependModalWindow
    }
});