import Vue from "vue";
import "syncfusion";
import createAddDependPointHandler from "./Diagram/AddDependedPoint";
declare const ej: any;
var constraints = ej.datavisualization.Diagram.DiagramConstraints.Default | ej.datavisualization.Diagram.DiagramConstraints.FloatElements;


export default Vue.extend({
	template: "#characteristic-diagram",
	props: ["graph", "classes", "height"],
	computed: {
		heightPx() {
			return this.height + "px";
		}
	},
	mounted() {
		var diagramId = this.graph.Name;
		$("#" + diagramId).ejDiagram({
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
				node.labels[0].text = node.name;
			},
			selectedItems: {
				userHandles: [createAddDependPointHandler()]
			}
		});
		$("#" + diagramId + "_overview").ejOverview({
			sourceID: diagramId,
			width: "100%",
			height: this.heightPx
		});
	}
});