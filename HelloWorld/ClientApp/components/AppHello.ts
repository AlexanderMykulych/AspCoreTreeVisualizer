// ClientApp/components/AppHello.ts
import Vue from "vue";
import Vuex from "vuex";
import CharacteristicDiagram from "./CharacteristicDiagram";
import { createStore } from "../Store/RootStore";
import * as graph from "../Store/GraphStore";
import { BasePoint } from "../Model/BasePoint";
import { Dependency } from "../Model/Dependency";


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
				Points: [{
					Name: "Start"
				}],
				Dependencies: []
			});
		},
		addNode: function (node: { graph: string, point: BasePoint }) {
			graph.addPoint(this.$store, node);
		},
		addConnection: function (connect: { graph: string, dep: Dependency }) {
			graph.addDependency(this.$store, connect);
		}
	},
    components: {
		CharacteristicDiagram
    }
});