import Vue from "vue";
import { PointType, AggregationType } from "../../../Model/PointType";
import _ from "lodash";

export default Vue.extend({
	template: "#graph-test",
	props: ["graph"],
	data() {
		return {
			selectedValues: [],
			dynamic: {
				Points: []
			}
		};
	},
	computed: {
		activePoints() {
			var result = [];
			if (this.points) {
				var startPoint = _.find(this.points, p => p.Options.type === PointType.start);
				result = this.getVisibleChildrens(startPoint);
			}
			return result;
		},
		activeCharacteristics() {
			var result = this.activePoints.filter(x => x.Options.type === PointType.characteristic);
			this.$emit("active", result);
			return result;
		},
		points() {
			return this.graph.Nodes;
		}
	},
	methods: {
		isFromStart(node) {
			return _.findIndex(this.graph.Connectors, (x: any) => x.Start.Options.type === PointType.start && x.End.name === node.name) >= 0;
		},
		getPointInDependencies(point) {
			return this.graph.Connectors.filter(x => x.End.name === point.name);
		},
		getStartPointByDep(dep) {
			return _.find(this.points, x => x.name === dep.Start.name);
		},
		reActiveChildrens(point) {
			var childrens = this.getChildren(point);
			childrens.forEach(child => {
				if (!child) {
					return;
				}
				var deps = this.getPointInDependencies(child);
				child.Active = _.findIndex(deps, dep => this.isDependencyPass(dep)) >= 0;
				if (!child.Active) {
					this.reActiveChildrens(child);
				}
			});
		},
		getChildren(node) {
			return this.graph.Connectors.filter(x => x.Start.name === node.name).map(x => this.getPointByName(x.End.name));
		},
		isDependencyPass(dep) {
			var start = dep.Start;
			var value = this.selectedValues[start.name];
			if (dep.Rules) {
				if (start.Options.type === PointType.characteristic) {
					if (_.isArray(dep.Rules.Values) && dep.Rules.Values.length) {
						if (value) {
							return _.findIndex(dep.Rules.Values, (x: any) => x.Id === value.Id) >= 0;
						}
						return false;
					}
				}
			}
			return true;
		},
		getPointByName(name) {
			return _.find(this.points, x => x.name === name);
		},
		getVisibleChildrens: function (point) {
			var childrens = this.getChildren(point);
			var actives = childrens.filter(x => {
				if (!x) {
					return false;
				}
				var deps = this.getPointInDependencies(x);
				return this.checkDependency(x, deps);
			});
			var activeChildrens = [];
			actives.forEach(x => activeChildrens = _.concat(activeChildrens, this.getVisibleChildrens(x)));
			return _.union(actives, activeChildrens);
		},
		checkDependency(point, deps) {
			if (_.includes([PointType.characteristic, PointType.start], point.Options.type) ||
				(point.Options.type === PointType.aggregator && point.Options.aggregation === AggregationType.Or)) {
				return _.some(deps, dep => this.isDependencyPass(dep));
			}
			if (point.Options.type === PointType.aggregator && point.Options.aggregation === AggregationType.And) {
				return _.every(deps, dep => this.isDependencyPass(dep));
			}
		}
	},
	watch: {
		graph() {
			this.$emit("graph-change");
		}
	}
});