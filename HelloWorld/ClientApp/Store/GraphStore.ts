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
import { uniqId } from "../mixins/IdGenerator";

type GraphContext = ActionContext<RootState, RootState>;

export const graphModule = {
	namespaced: true,

	state: {
		Graphs: [{
			Name: "Graph1",
			Points: [
				{
					name: uniqId(),
					Label: "Start",
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
					Id: uniqId(),
					Name: "Char 1. Value 1"
				}, {
					Id: uniqId(),
					Name: "Char 1. Value 2"
				}]
			},
			{
				Name: "Char 2",
				Values: [{
					Id: uniqId(),
					Name: "Char 2. Value 1"
				}, {
					Id: uniqId(),
					Name: "Char 2. Value 2"
				}, {
					Id: uniqId(),
					Name: "Char 2. Value 3"
				}
				]
			},
			{
				Name: "Char 3",
				Values: [{
					Id: uniqId(),
					Name: "Char 3. Value 1"
				}, {
					Id: uniqId(),
					Name: "Char 3. Value 2"
				}, {
					Id: uniqId(),
					Name: "Char 3. Value 3"
				}, {
					Id: uniqId(),
					Name: "Char 3. Value 4"
				}, {
					Id: uniqId(),
					Name: "Char 3. Value 5"
				}, {
					Id: uniqId(),
					Name: "Char 3. Value 6"
				}, {
					Id: uniqId(),
					Name: "Char 3. Value 7"
				}, {
					Id: uniqId(),
					Name: "Char 3. Value 8"
				}, {
					Id: uniqId(),
					Name: "Char 3. Value 9"
				}
				]
			}
		],
		Roles: [
			{
				Id: uniqId(),
				Name: "Role 1"
			},
			{
				Id: uniqId(),
				Name: "Role 2"
			},
			{
				Id: uniqId(),
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
							sourceNode: con.Start.name,
							targetNode: con.End.name
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
			var graph = _.find(state.Graphs, x => x.Name === item.graph);
			var duplicatePointIndex = _.findIndex(graph.Points, x => x.name === item.point.name);

			if (duplicatePointIndex < 0) {
				graph.Points.push(item.point);
			} else {
				var duplicatePoint = graph.Points[duplicatePointIndex];
				_.assign(duplicatePoint, item.point);
				graph.Points.splice(duplicatePointIndex, 1, duplicatePoint);
			}
		},
		addDependency(state: RootState, item: { graph: string, dep: Dependency }) {
			//TODO: Применить измение к диаграме
			var graph = _.find(state.Graphs, x => x.Name === item.graph);
			var duplicateDepIndex = _.findIndex(graph.Dependencies, x => x.Name === item.dep.Name);
			if (duplicateDepIndex < 0) {
				graph.Dependencies.push(item.dep);
			} else {
				var duplicateDep = graph.Dependencies[duplicateDepIndex];
				_.assign(duplicateDep, item.dep);
				graph.Dependencies.splice(duplicateDepIndex, 1, duplicateDep);
			}
		},
		changeNodeProperty(state: RootState, item: { graph: string, name: string, propName: string, newValue: any }) {
			var points = _.find(state.Graphs, x => x.Name === item.graph).Points;
			var point = _.find(points, x => x.name === item.name);
			Vue.set(point, item.propName, item.newValue);
		},
		removeConnection(state: RootState, options: { graph: string, connectorName: string }) {
			var graph = _.find(state.Graphs, x => x.Name === options.graph);
			_.remove(graph.Dependencies, x => x.Name === options.connectorName);
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
export const removeConnection = commit(graphModule.mutations.removeConnection);