import Vue from "vue";
import _ from "lodash";
import "syncfusion";
import memoizeDebounce, { difference } from "../mixins/m_lodash";
import addDependModalWindow from "./Diagram/AddDependPointWindow";
import createAddDependPointHandler from "./Diagram/Handler/AddDependedPoint";
import createChangePointSettingHandler from "./Diagram/Handler/ChangePointSettingHandler";
import { connect } from "http2";
import { PointType, CharacteristicType } from "../Model/PointType";
import { uniqId } from "../mixins/IdGenerator";
import { BasePoint } from "../Model/BasePoint";
import testControll from "./Diagram/Test/GraphTestControll";
declare const ej: any;
var _Vue: any = Vue;
var constraints = ej.datavisualization.Diagram.DiagramConstraints.Default | ej.datavisualization.Diagram.DiagramConstraints.FloatElements;

export default Vue.extend({
	template: "#characteristic-diagram",
	props: ["graph", "classes", "height", "characteristics", "roles"],
	data() {
		return {
			bus: new Vue(),
			showDependModal: false,
			offsetYMargin: 250,
			addMode: false,
			diagramInit: false,
			selectedNodes: [],
			isModalWindow: true,
			IsOverviewActive: true
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
			return this.diagramInit ? $(this.diagramElId).ejDiagram("instance") : null;
		},
		firstSelectNode() {
			return this.selectedNodes && this.selectedNodes.length > 0 ? this.selectedNodes[0] : null;
		},
		firstSelectNodeValues() {
			return this.firstSelectNode ? this.firstSelectNode.Values : null;
		},
		firstSelectNodeDependency() {
			return this.graph && this.firstSelectNode ? this.graph.Connectors.filter(x => x.End.name === this.firstSelectNode.name) : null;
		},
		dependSelectedNodes() {
			return this.selectedNodes ? this.selectedNodes
				.filter(x => x.Options.type != PointType.characteristic || x.Characteristic.characteristicType === CharacteristicType.Lookup)
				.map(x => {
					return {
						Name: uniqId(),
						Start: x,
						End: null,
						Rules: {
							Values: [],
							Roles: []
						}
					};
			}) : null;
		},
		connectors() {
			this.graph.Connectors.forEach(x => this.updateConnectorLabel(x));
			return this.graph.Connectors;
		},
		nodes() {
			this.graph.Nodes.forEach(x => this.updateNodeLabel(x));
			return this.graph.Nodes;
		},
		saveGraphUrl() {
			return "api/SettingsTreeConfig";
		}
	},
	methods: {
		selectionChange(selectedItems) {
			if (!selectedItems || selectedItems.length <= 0) {
				this.selectedNodes = null;
				return;
			}
			var selectedNodes = selectedItems.filter(x => x._type === "node");
			this.selectedNodes = _.map(selectedNodes, (x: any) => _.find(this.graph.Nodes, y => y.name === x.name));
		},
		commitPointAndDependency(options) {
			var points = options.points;
			var dependency = options.dependency;

			points.forEach(point => this.commitPoint(point));
			dependency.forEach(dep => this.commitConnection(dep));

			this.showDependModal = false;
		},
		commitConnection(options) {
			this.$emit("on-add-connection", {
				graph: this.diagramId,
				dep: options
			});
		},
		commitPoint(options) {
			this.$emit("on-add-node", {
				graph: this.diagramId,
				point: options
			});
		},
		openAddDependModal(option?: any) {
			this.addMode = true;
			this.showDependModal = true;
		},
		openChangePointModal(option?: any) {
			this.addMode = false;
			this.showDependModal = true;
		},
		updateNodeProp: memoizeDebounce(function (args) {
			var node = _.find(this.graph.Nodes, node => node.name === args.element.name);
			if (node) {
				this.$emit("node-prop-change", {
					graph: this.graph.Name,
					name: node.name,
					propName: args.propertyName,
					newValue: args.element[args.propertyName]
				});
			}
		}, 500, x => x.propertyName),
		updateNodeLabel(node) {
			if (node.Options) {
				var property = this.getNodeProperties(node);
				_.assign(node, property);
			}
			if (!node.labels || node.labels.length <= 0) {
				node.labels = [{
					name: "label1",
					bold: true,
					fontColor: "black",
					horizontalAlignment: ej.datavisualization.Diagram.HorizontalAlignment.Right,
					verticalAlignment: ej.datavisualization.Diagram.VerticalAlignment.Bottom,
					offset: {
						y: 1.2,
						x: 0.8
					},
					boundaryConstraints: false
				}];
			}
			node.labels[0].text = node.Label;
		},
		updateConnectorLabel(connector) {
			if (!connector.labels || connector.labels.lenght <= 0) {
				connector.labels = [{
					name: "label2",
					bold: true,
					fontColor: "black",
					alignment: "center",
					boundaryConstraints: false,
					offset: ej.datavisualization.Diagram.Point(0, 0)
				}];
			}
			connector.labels[0].text = connector.Label;
		},
		goTest() {
			this.IsOverviewActive = false;
		},
		goOverview() {
			this.IsOverviewActive = true;
		},
		testActiveNode(actives) {
			if (!_.isArray(actives) || !this.diagram) {
				return;
			}
			this.graph.Nodes.forEach(node => {
				var active = node.Options.type === PointType.start || _.findIndex(actives, x => x.name === node.name) >= 0;
				var properties = !this.IsOverviewActive && active ? {
					fillColor: "#a6f568"
				} : this.getNodeProperties(node);
				this.diagram.updateNode(node.name, properties);
			});
			
		},
		getNodeProperties(node) {
			switch (node.Options.type) {
				case PointType.start:
					return {
						fillColor: "#29c15f",
						shape: "ellipse"
					}
				case PointType.characteristic:
					return {
						fillColor: node.Characteristic.characteristicType === CharacteristicType.Lookup ? "#2085c9" : "#f55710",
						shape: "rectangle"
					}
				case PointType.aggregator:
					return {
						fillColor: "#ec7e0d",
						shape: "ellipse"
					}
			}
		},
		removeConnector(connector) {
			this.$emit("remove-connection", {
				graph: this.graph.Name,
				connectorName: connector.Name
			});
		},
		removeNode(node) {
			this.$emit("remove-node", {
				graph: this.graph.Name,
				nodeName: node.name
			});
		},
		connectionChange(options) {
			var dep: any = {
				Name: options.element.Name
			};
			switch (options.endPoint) {
				case "targetEndPoint":
					dep.End = options.connection
					break;
				case "sourceEndPoint":
					return;
				default:
					return;
			}
			this.$emit("on-add-connection", {
				graph: this.graph.Name,
				dep
			});
		},
		saveGraph() {
			var preparedGraph = this.prepareGraphForSave(this.graph);
			var jGraph = JSON.stringify(this.graph);
			
			this.$http.post(this.saveGraphUrl, jGraph)
				.than(response => alert("Збереження пройшло успішно!"), error => alert(error));
		},
		prepareGraphForSave(graph) {
			var preparedGraph = _Vue.util.extend({}, this.graph);
			preparedGraph.Nodes = preparedGraph.Nodes.map(x => _.merge(x, {
				pointType: x.Options.type
			}))
			return preparedGraph;
		}
	},
	mounted() {
		var $this = this;
		this.bus.$on("add-depend-point", (options?: any) => this.openAddDependModal(options));
		this.bus.$on("change-point", (options?: any) => this.openChangePointModal(options));
		$(this.diagramElId).ejDiagram({
			enableContextMenu: false,
			constraints,
			width: "100%",
			height: this.heightPx,
			nodes: this.nodes,
			connectors: this.connectors,
			defaultSettings: {
				node: {
					width: 65,
					height: 65,
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
				}), createChangePointSettingHandler({
					bus: this.bus
				})]
			},
			propertyChange(args) {
				if (args.elementType === "node") {
					if (_.includes(["offsetX", "offsetY"], args.propertyName)) {
						$this.updateNodeProp(args);
					}
				}
			},
			selectionChange: function (options) {
				$this.selectionChange(options.selectedItems);
			},
			connectorCollectionChange(options) {
				if (options.changeType === "remove") {
					$this.removeConnector(options.element);
				}
			},
			nodeCollectionChange(options) {
				if (options.changeType === "remove") {
					$this.removeNode(options.element);
				}
			},
			connectionChange(options) {
				$this.connectionChange(options);
			}
		});
		$(this.diagramOverviewElId).ejOverview({
			sourceID: this.diagramId,
			width: "100%",
			height: this.heightPx
		});
		this.diagramInit = true;
	},
	components: {
		addDependModalWindow,
		testControll
	},
	watch: {
		graph(val) {
			var diagram = this.diagram;
			var nodes = diagram.nodes();
			var connectors = diagram.connectors();
			val.Nodes.forEach(x => {
				this.updateNodeLabel(x);
				var node = _.find(nodes, (y: any) => y.name === x.name);
				if (node) {
					var diffNode = difference(x, node);
					if (diffNode) {
						diagram.updateNode(node.name, diffNode);
					}
					var diffLabel = difference(x.labels[0], node.labels[0]);
					if (diffLabel) {
						diagram.updateLabel(node.name, node.labels[0], diffLabel);
					}
				} else {
					diagram.add(x)
				}
			});
			val.Connectors.forEach(x => {
				this.updateConnectorLabel(x);
				var conn = _.find(connectors, (y: any) => y.name === x.Name);
				if (conn) {
					var diffConn = difference(x, conn);
					if (diffConn) {
						diagram.updateConnector(conn.name, diffConn);
					}
					if (conn.labels.length > 0) {
						var diffLabel = difference(x.labels[0], conn.labels[0]);
						if (diffLabel) {
							diagram.updateLabel(conn.name, conn.labels[0], diffLabel);
						}
					} else {
						diagram.addLabel(conn.name, x.labels[0]);
					}
				} else {
					diagram.add(x)
				}
			});
		}
	}
});