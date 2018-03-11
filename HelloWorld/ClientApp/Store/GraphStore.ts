import { ActionContext, Store, GetterTree } from "vuex";
import { getStoreAccessors } from "vuex-typescript";
import { Graph } from "../Model/Graph";
import { RootState } from "../Model/RootState";
import _ from "lodash";
import { SfGraph } from "../Model/SyncfusionGraph/Graph";
import { BasePoint } from "../Model/BasePoint";
import { Node } from "../Model/SyncfusionGraph/Node";
import { Connector } from "../Model/SyncfusionGraph/Connector";
import { connect } from "http2";

type GraphContext = ActionContext<RootState, RootState>;

export const graphModule = {
	namespaced: true,

	state: {
		Graphs: [{
			Name: "Graph1",
			Start: {
				Name: "Start Point",
				To: [{
					Name: "Connect1",
					End: {
						Name: "Second Point"
					}
				}, {
					Name: "Connect2",
					End: {
						Name: "Point 2"
					}
				}, {
					Name: "Connect3",
					End: {
						Name: "point 3",
						To: [{
							Name: "Con",
							End: {
								Name: "point 3.1"
							}
						}]
					}
				}]
			}
		}, {
				Name: "Graph2",
				Start: {
					Name: "Start Point",
					To: [{
						Name: "Connect1",
						End: {
							Name: "Second Point"
						}
					}, {
						Name: "Connect2",
						End: {
							Name: "Point 2"
						}
					}, {
						Name: "Connect3",
						End: {
							Name: "point 3",
							To: [{
								Name: "Con",
								End: {
									Name: "point 3.1"
								}
							}]
						}
					}]
				}
			}]
	},
	getters: {
		getGraph(state: RootState) {
			return state.Graphs;
		},
		graphCount(state: RootState) {
			return state.Graphs.length;
		},
		getSyncfusionGraphByName(state: RootState) {
			return (name: string) => {
				var graph = _.first(state.Graphs.filter(x => x.Name === name));
				return graphModule.getters.getSyncfusiongGraphByGraph(state)(graph);
			};
		},
		getSyncfusiongGraphByGraph(state: RootState) {
			return (graph: Graph) => {
				return {
					Name: graph.Name,
					Nodes: graphModule.getters.getAllNodesByPoint(state)(graph.Start),
					Connectors: graphModule.getters.getAllConnectorsByPoint(state)(graph.Start)
				};
			};
		},
		getAllNodesByPoint: function (state: RootState) {
			return (point: BasePoint) => {
				var nodes: Array<Node> = [];
				if (point == null) {
					return nodes;
				}
				nodes.push({
					name: point.Name
				});
				for (var i in point.To) {
					var dep = point.To[i];
					var toNodes = graphModule.getters.getAllNodesByPoint(state)(dep.End);
					nodes = _.concat(nodes, toNodes);
				}
				return nodes;
			};
		},
		getAllConnectorsByPoint: function (state: RootState) {
			return (point: BasePoint) => {
				var connectors: Array<Connector> = [];
				if (point == null || point.To == null) {
					return connectors;
				}
				for (var i in point.To) {
					var dep = point.To[i];
					connectors.push({
						name: dep.Name,
						sourceNode: point.Name,
						targetNode: dep.End.Name
					});
					var toConnectors = graphModule.getters.getAllConnectorsByPoint(state)(dep.End);
					connectors = _.concat(connectors, toConnectors);
				}
				return connectors;
			};
		}
	},
	mutations: {
		addGraph(state: RootState, item: Graph) {
			state.Graphs.push(item);
		}
	}
};

const { read, commit } =
	getStoreAccessors<RootState, RootState>("graph");

export const readGraph = read(graphModule.getters.getGraph);
export const readGraphCount = read(graphModule.getters.graphCount);
export const getSyncfusionGraphByName = read(graphModule.getters.getSyncfusionGraphByName);
export const getSyncfusiongGraphByGraph = read(graphModule.getters.getSyncfusiongGraphByGraph);

export const addGraph = commit(graphModule.mutations.addGraph);