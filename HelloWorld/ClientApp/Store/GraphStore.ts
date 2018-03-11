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
import { Dependency } from "../Model/Dependency";

type GraphContext = ActionContext<RootState, RootState>;

export const graphModule = {
	namespaced: true,

	state: {
		Graphs: [{
			Name: "Graph1",
			Points: [
				{
					Name: "Start"
				}, {
					Name: "Point2"
				}, {
					Name: "Point3"
				}, {
					Name: "Point4"
				}, {
					Name: "Point5"
				}, {
					Name: "Point6"
				}, {
					Name: "Point7"
				}
			],
			Dependencies: [
				{
					Start: "Start",
					Name: "C1",
					End: "Point2"
				},
				{
					Start: "Point2",
					Name: "C2",
					End: "Point3"
				},
				{
					Start: "Point2",
					Name: "C3",
					End: "Point4"
				},
				{
					Start: "Start",
					Name: "C4",
					End: "Point5"
				},
				{
					Start: "Point5",
					Name: "C5",
					End: "Point6"
				},
				{
					Start: "Start",
					Name: "C6",
					End: "Point7"
				}
			]
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
					Nodes: graph.Points,
					Connectors: _.map(graph.Dependencies, function (con) {
						return {
							name: con.Name,
							sourceNode: con.Start,
							targetNode: con.End
						}
					})
				};
			};
		}
	},
	mutations: {
		addGraph(state: RootState, item: Graph) {
			state.Graphs.push(item);
		},
		addPoint(state: RootState, item: { graph: string, point: BasePoint }) {
			state.Graphs.filter(x => x.Name === item.graph)[0].Points.push(item.point);
		},
		addDependency(state: RootState, item: { graph: string, dep: Dependency }) {
			state.Graphs.filter(x => x.Name === item.graph)[0].Dependencies.push(item.dep);
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
export const addPoint = commit(graphModule.mutations.addPoint);
export const addDependency = commit(graphModule.mutations.addDependency);