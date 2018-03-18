// ClientApp/components/AppHello.ts
import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash";
import CharacteristicDiagram from "./CharacteristicDiagram";
import { createStore } from "../Store/RootStore";
import * as graph from "../Store/GraphStore";
import { BasePoint } from "../Model/BasePoint";
import { Dependency } from "../Model/Dependency";
import { PointType } from "../Model/PointType";
import { uniqId } from "../mixins/IdGenerator";


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
		test() {
			return graph.readGraph(this.$store)[0].Points.map(x => x.Label);
		},
		diagrams() {
			return graph.readGraph(this.$store).map(x => graph.getSyncfusiongGraphByGraph(this.$store)(x));
		},
		characteristics() {
			return graph.getCharacteristicsList(this.$store);
		},
		roles() {
			return graph.getRoles(this.$store);
		}
	},
	methods: {
		addGraph: function () {
			graph.addGraph(this.$store, {
				Name: "Graph" + (graph.readGraphCount(this.$store) + 1),
				Points: [{
					name: uniqId(),
					offsetX: 500,
					offsetY: 20,
					Label: "Start",
					Options: {
						type: PointType.start
					}
				}],
				Dependencies: []
			});
		},
		addNode: function (node: { graph: string, point: BasePoint }) {
			graph.addPoint(this.$store, node);
		},
		addConnection: function (connect: { graph: string, dep: Dependency }) {
			graph.addDependency(this.$store, connect);
		},
		onNodePropChange: function (options: { graph: string, name: string, propName: string, newValue: any }) {
			graph.changeNodeProperty(this.$store, options);
		}
	},
    components: {
		CharacteristicDiagram
    }
});