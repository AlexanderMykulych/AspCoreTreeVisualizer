import Vue from "vue";
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
import { PointType } from "../Model/PointType";

type GraphContext = ActionContext<RootState, RootState>;

export const graphModule = {
	namespaced: true,

	state: {
		Graphs: [{
			Name: "Graph1",
			Points: [
				{
					name: "Start",
					labels: [{
						text: "Start Point"
					}],
					offsetX: 500,
					offsetY: 60,
					Options: {
						type: PointType.start
					}
				}
			],
			Dependencies: []
		}],
		Characteristics: [
			{
				Name: "Char 1",
				Values: [{
					Name: "Char 1. Value 1"
				}, {
					Name: "Char 1. Value 2"
				}]
			},
			{
				Name: "Char 2",
				Values: [{
						Name: "Char 2. Value 1"
					}, {
						Name: "Char 2. Value 2"
					}, {
						Name: "Char 2. Value 3"
					}
				]
			},
			{
				Name: "Char 3",
				Values: [{
						Name: "Char 3. Value 1"
					}, {
						Name: "Char 3. Value 2"
					}, {
						Name: "Char 3. Value 3"
					}, {
						Name: "Char 3. Value 4"
					}, {
						Name: "Char 3. Value 5"
					}, {
						Name: "Char 3. Value 6"
					}, {
						Name: "Char 3. Value 7"
					}, {
						Name: "Char 3. Value 8"
					}, {
						Name: "Char 3. Value 9"
					}
				]
			}
		],
		Roles: [
			{
				Name: "Role 1"
			},
			{
				Name: "Role 2"
			},
			{
				Name: "Role 3"
			}
		]
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
						return _.merge({
							name: con.Name,
							sourceNode: con.Start,
							targetNode: con.End
						}, con);
					})
				};
			};
		},
		getCharacteristicsList(state: RootState) {
			return state.Characteristics;
		},
		getRoles(state: RootState) {
			return state.Roles;
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
		},
		changeNodeProperty(state: RootState, item: { graph: string, name: string, propName: string, newValue: any }) {
			var points = _.find(state.Graphs, x => x.Name === item.graph).Points;
			var point = _.find(points, x => x.name === item.name);
			Vue.set(point, item.propName, item.newValue);
		}
	}
};

const { read, commit } =
	getStoreAccessors<RootState, RootState>("graph");

export const readGraph = read(graphModule.getters.getGraph);
export const readGraphCount = read(graphModule.getters.graphCount);
export const getSyncfusionGraphByName = read(graphModule.getters.getSyncfusionGraphByName);
export const getSyncfusiongGraphByGraph = read(graphModule.getters.getSyncfusiongGraphByGraph);
export const getCharacteristicsList = read(graphModule.getters.getCharacteristicsList);
export const getRoles = read(graphModule.getters.getRoles);

export const addGraph = commit(graphModule.mutations.addGraph);
export const addPoint = commit(graphModule.mutations.addPoint);
export const addDependency = commit(graphModule.mutations.addDependency);
export const changeNodeProperty = commit(graphModule.mutations.changeNodeProperty);