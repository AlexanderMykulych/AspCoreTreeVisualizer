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
			selectedNodes: [],
			offsetYMargin: 250
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
		addDependentPoint(options) {
			var point = options.point;
			var rules = options.rules;
			var pointName = point.name;
			var firstSelectedNode = this.selectedNodes[0];
			var offsetX = firstSelectedNode.offsetX;
			var offsetY = firstSelectedNode.offsetY;
			var endPoint = pointName;

			this.addPoint(_.merge({
				name: pointName,
				offsetX: offsetX,
				offsetY: offsetY + this.offsetYMargin,
				Options: {
					type: PointType.characteristic
				},
				labels: [{
					text: pointName
				}]
			}, point.options));

			if (this.selectedNodes.length > 1) {
				var andPointName = "AND_" + pointName;
				endPoint = andPointName;
				this.addPoint({
					name: andPointName,
					offsetX: offsetX,
					offsetY: offsetY + this.offsetYMargin / 2,
					Options: {
						type: PointType.aggregator
					}
				});
				this.addConnection({
					Start: endPoint,
					End: pointName,
					Name: endPoint + "_" + pointName
				});
			}
			_.forEach(this.selectedNodes, node => {
				this.addConnection({
					Start: node.name,
					End: endPoint,
					Name: node.name + "_" + endPoint,
					Rules: rules
				});
			});
			this.showAddDependModal = false;
		},
		addConnection(options) {
			this.$emit("on-add-connection", {
				graph: this.diagramId,
				dep: options
			});
		},
		addPoint(options) {
			this.$emit("on-add-node", {
				graph: this.diagramId,
				point: options
			});
		},
		openAddDependModal(option?: any) {
			var selected = this.diagram.selectionList[0];
			var selectedNodes = [];
			if (selected._type === "node") {
				selectedNodes = [selected.name];
			} else if (selected.type === "pseudoGroup") {
				selectedNodes = selected.children;
			}
			this.selectedNodes = _.map(selectedNodes, x => this.diagram.findNode(x));
			this.showAddDependModal = true;
		},
		updateNodeProp: function () {
			var mem = _.memoize(function (memArgs) {
				return _.debounce(function (args) {
					var node = _.find(this.graph.Nodes, node => node.name === args.element.name);
					if (node) {
						this.$emit("node-prop-change", {
							graph: this.graph.Name,
							name: node.name,
							propName: args.propertyName,
							newValue: args.element[args.propertyName]
						});
					}
				}, 500);
			}, args => args.propertyName);
			mem.apply(this, arguments).apply(this, arguments);
		}
	},
	mounted() {
		var $this = this;
		this.bus.$on("add-depend-point", (options?: any) => this.openAddDependModal(options));
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
			},
			propertyChange(args) {
				if (args.elementType === "node") {
					if (_.includes(["offsetX", "offsetY"], args.propertyName)) {
						$this.updateNodeProp(args);
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