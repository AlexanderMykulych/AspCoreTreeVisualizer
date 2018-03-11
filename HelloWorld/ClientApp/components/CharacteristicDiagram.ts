import Vue from "vue";
import _ from "lodash";
import "syncfusion";
import addDependModalWindow from "./Diagram/AddDependPointWindow";
import createAddDependPointHandler from "./Diagram/AddDependedPoint";
import { connect } from "http2";
declare const ej: any;
var constraints = ej.datavisualization.Diagram.DiagramConstraints.Default | ej.datavisualization.Diagram.DiagramConstraints.FloatElements;

export default Vue.extend({
	template: "#characteristic-diagram",
	props: ["graph", "classes", "height"],
	data() {
		return {
			bus: new Vue(),
			showAddDependModal: false,
			selectedNodes: []
		};
	},
	computed: {
		heightPx() {
			return this.height + "px";
		},
		diagramId() {
			return this.graph.Name;
		},
		diagramElId() {
			return "#" + this.diagramId;
		},
		diagramOverviewElId() {
			return this.diagramElId + "_overview";
		},
		diagram() {
			return $(this.diagramElId).ejDiagram("instance");
		}
	},
	methods: {
		addPoint(pointName) {
			var $this = this;
			this.$emit("on-add-node", {
				graph: this.diagramId,
				point: {
					Name: pointName
				}
			});
			_.forEach(this.selectedNodes, node => {
				$this.$emit("on-add-connection", {
					graph: this.diagramId,
					dep: {
						Start: node,
						End: pointName,
						Name: node + "_" + pointName
					}
				});
			});
			this.showAddDependModal = false;
		}
	},
	mounted() {
		var $this = this;
		this.bus.$on("add-depend-point", function (option?: any) {
			var selected = $this.diagram.selectionList[0];
			if (selected.type === "basic") {
				$this.selectedNodes = [selected.name];
			} else if (selected.type === "pseudoGroup") {
				$this.selectedNodes = selected.children;
			}
			$this.showAddDependModal = true;
		});
		$(this.diagramElId).ejDiagram({
			enableContextMenu: false,
			constraints,
			width: "100%",
			height: this.heightPx,
			nodes: this.graph.Nodes,
			connectors: this.graph.Connectors,
			layout: {
				type: ej.datavisualization.Diagram.LayoutTypes.HierarchicalTree
			},
			defaultSettings: {
				node: {
					width: 100,
					height: 40,
					fillColor: "darkcyan",
					labels: [{
						name: "label1",
						bold: true,
						fontColor: "white"
					}]
				},
				connector: {
					segments: [{
						"type": "orthogonal"
					}]
				}
			},
			nodeTemplate(diagram, node) {
				node.name = node.Name;
				node.labels[0].text = node.name;
			},
			//connectorTemplate(diagram, connector) {
			//	connector.name = connector.Name;
			//	connector.sourceNode = connector.Start;
			//	connector.targetNode = connector.End;
			//},
			selectedItems: {
				userHandles: [createAddDependPointHandler({
					bus: this.bus
				})]
			}
		});
		$(this.diagramOverviewElId).ejOverview({
			sourceID: this.diagramId,
			width: "100%",
			height: this.heightPx
		});
	},
	components: {
		addDependModalWindow
	},
	watch: {
		graph(val) {
			var diagram = this.diagram;

			_.filter(val.Nodes, function (node) {
				return !_.find(diagram.nodes, x => x.Name === node.Name);
			})
			.forEach(x => diagram.add(x));

			_.filter(val.Connectors, function (con) {
				return !_.find(diagram.connectors, x => x.name === con.name);
			})
				.forEach(x => diagram.add(x));

			diagram.layout();
		}
	}
});