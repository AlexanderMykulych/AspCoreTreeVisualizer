import Vue from "vue";
import _ from "lodash";
import "syncfusion";
import addDependModalWindow from "./Diagram/AddDependPointWindow";
import createAddDependPointHandler from "./Diagram/AddDependedPoint";
import { connect } from "http2";
import { PointType } from "../Model/PointType";
declare const ej: any;
var constraints = ej.datavisualization.Diagram.DiagramConstraints.Default | ej.datavisualization.Diagram.DiagramConstraints.FloatElements;

export default Vue.extend({
	template: "#characteristic-diagram",
	props: ["graph", "classes", "height", "characteristics"],
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
		addPoint(point) {
			var $this = this
			var pointName = point.name;
			var firstSelectedNode = this.diagram.findNode(this.selectedNodes[0]);
			var endPoint = pointName;
			this.$emit("on-add-node", {
				graph: this.diagramId,
				point: _.merge({
					name: pointName,
					offsetX: firstSelectedNode.offsetX,
					offsetY: firstSelectedNode.offsetY + 200,
					Options: {
						type: PointType.characteristic
					}
				}, point.options)
			});
			if (this.selectedNodes.length > 1) {
				var andPointName = "AND_" + pointName;
				endPoint = andPointName;
				this.$emit("on-add-node", {
					graph: this.diagramId,
					point: {
						name: andPointName,
						offsetX: firstSelectedNode.offsetX,
						offsetY: firstSelectedNode.offsetY + 100,
						Options: {
							type: PointType.aggregator
						}
					}
				});
				$this.$emit("on-add-connection", {
					graph: this.diagramId,
					dep: {
						Start: endPoint,
						End: pointName,
						Name: endPoint + "_" + pointName
					}
				});
			}
			_.forEach(this.selectedNodes, node => {
				$this.$emit("on-add-connection", {
					graph: this.diagramId,
					dep: {
						Start: node,
						End: endPoint,
						Name: node + "_" + endPoint
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
			defaultSettings: {
				node: {
					width: 65,
					height: 65,
					labels: [{
						name: "label1",
						bold: true,
						fontColor: "black",
						horizontalAlignment: ej.datavisualization.Diagram.HorizontalAlignment.Right,
						verticalAlignment: ej.datavisualization.Diagram.VerticalAlignment.Bottom,
						offset: {
							y: 1.2,
							x: 0.8
						}
					}],
					borderWidth: 0
				},
				connector: {
					segments: [{
						"type": "orthogonal"
					}]
				}
			},
			scrollSettings: {
				horizontalOffset: 0,
				verticalOffset: 0,
				zoomFactor: 0.2
			},
			enableAutoScroll: true,
			pageSettings: {
				scrollLimit: "infinity"
			},
			selectedItems: {
				userHandles: [createAddDependPointHandler({
					bus: this.bus
				})]
			},
			nodeTemplate(diagram, node) {
				if (node.Options) {
					var type = node.Options.type;
					switch (type) {
						case PointType.start:
							node.fillColor = "#29c15f";
							node.shape = "ellipse";
							break;
						case PointType.characteristic:
							node.fillColor = "#2085c9";
							node.shape = "rectangle";
							break;
						case PointType.aggregator:
							node.fillColor = "#ec7e0d";
							node.shape = "ellipse";
							break;
					}
				}
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
				return !_.find(diagram.nodes(), x => x.name === node.name);
			})
				.forEach(x =>
					diagram.add(
						_.merge(x, {
							labels: [{
								text: x.name
							}]
						})
					)
				);

			_.filter(val.Connectors, function (con) {
				return !_.find(diagram.connectors(), x => x.name === con.name);
			})
				.forEach(x => diagram.add(x));
		}
	}
});