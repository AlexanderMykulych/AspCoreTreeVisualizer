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
import StandartModalWindow from "../components/ModalWindow/Standart/StandartModalWindow";
var _Vue: any = Vue;

var store = createStore();
export default _Vue.extend({
	template: '#app-hello-template',
	store,
	data() {
		return {
			message: "test message",
			showAddGraph: false,
			addedCategory: null
		};
	},
	computed: {
		test() {
			return graph.readGraph(this.$store)[0].Points.map(x => x.Label);
		},
		diagrams() {
			return graph.readGraph(this.$store).map(x => graph.getSyncfusiongGraphByGraph(this.$store)(x));
		},
		roles() {
			return graph.getRoles(this.$store);
		},
		characteristicUrl() {
			return "api/GetCharacteristic";
		},
		categoryUrl() {
			return "api/GetCategory";
		}
	},
	asyncData: {
		characteristics() {
			return new Promise((resolve, reject) => {
				this.$http.get(this.characteristicUrl, {
					headers: {
						"Content-Type": "application/json"
					}
				})
				.then(response => resolve(response.data.map(x => {
						return {
							Id: x.id,
							Name: x.name,
							lookupName: x.lookupName,
							characteristicType: x.characteristicType
						};
					}))
				)
			});
		},
		categories() {
			return new Promise((resolve, reject) => {
				this.$http.get(this.categoryUrl)
					.then(response => resolve(response.data.map(x => {
						return {
							Id: x.id,
							Name: x.name
						};
					})))
			});
		}
	},
	methods: {
		addGraphClick() {
			this.showAddGraph = true;
		},
		addGraph() {
			this.showAddGraph = false;
			graph.addGraph(this.$store, {
				Name: "Graph_" + uniqId(),
				Points: [{
					name: uniqId(),
					offsetX: 500,
					offsetY: 20,
					Label: "Start",
					Options: {
						type: PointType.start
					},
					Category: this.addedCategory
				}],
				Dependencies: []
			});
		},
		addNode(node: { graph: string, point: BasePoint }) {
			graph.addPoint(this.$store, node);
		},
		addConnection(connect: { graph: string, dep: Dependency }) {
			graph.addDependency(this.$store, connect);
		},
		onNodePropChange(options: { graph: string, name: string, propName: string, newValue: any }) {
			graph.changeNodeProperty(this.$store, options);
		},
		removeConnection(options: {graph: string, connectorName: string}) {
			graph.removeConnection(this.$store, options);
		},
		removeNode(options: { graph: string, nodeName: string }) {
			graph.removeNode(this.$store, options);
		}
	},
    components: {
		CharacteristicDiagram,
		StandartModalWindow
	}
});