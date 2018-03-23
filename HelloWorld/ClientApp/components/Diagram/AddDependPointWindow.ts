import Vue from "vue";
import _ from 'lodash';
import RuleControll from "./RuleControll";
import { uniqId } from "../../mixins/IdGenerator";
import { PointType, AggregationType, CharacteristicType } from "../../Model/PointType";
import AnyValue from "../Diagram/AnyValueControll";
declare const $: any;
declare const Object: any;
var _Vue: any = Vue;

function getDefaultValue() {
	return {
		point: {
			name: null,
			DefaultValue: null,
			Label: null,
			Characteristic: null,
			Values: [],
			Value: null,
			Roles: null,
			Required: false,
			Options: {
				type: PointType.characteristic
			}
		},
		uniqId: uniqId(),
		offsetYDelta: 250,
		addExistCharacteristic: false,
		existPoint: null,
		dependency: null,
		aggregation: AggregationType.And
	};
}

export default _Vue.extend({
	template: "#add-depend-point",
	props: ["show", "id", "default_dependency", "roles", "defaultPoint", "defaultDependency", "isModalWindow", "points", "characteristics"],
	components: {
		RuleControll,
		AnyValue
	},
	computed: {
		elId() {
			return "#add-depend-point_" + this.id;
		},
		mainClassObject() {
			return {
				modal: this.isModalWindow,
				fade: this.isModalWindow
			};
		},
		modalMaxWidth() {
			return this.isModalWindow ? "80%" : "100%";
		},
		endPoint() {
			return this.addExistCharacteristic ? this.existPoint : _.merge(this.point, { name: uniqId() });
		},
		characterValueUrl() {
			return this.point.Characteristic ? "api/CharacteristicLookupValue/" + this.point.Characteristic.lookupName : null;
		},
		isAggregationNeed() {
			return this.dependency && this.dependency.length > 1;
		},
		pointTypeAnd() {
			return AggregationType.And;
		},
		pointTypeOr() {
			return AggregationType.Or;
		},
		aggregationLabel() {
			return this.aggregation === AggregationType.And ? "And" : "Or";
		},
		isPointCharacteristicLookup() {
			return this.point.Characteristic && this.point.Characteristic.characteristicType === CharacteristicType.Lookup;
		},
		characteristicType() {
			return this.point.Characteristic ? this.point.Characteristic.characteristicType : null;
		}
	},
	asyncComputed: {
		characteristicValues() {
			return new Promise(resolve => {
				if (this.characterValueUrl) {
					this.$http.get(this.characterValueUrl, {
						headers: {
							"Content-Type": "application/json"
						}
					})
						.then(response => resolve(response.data.map(x => {
							return {
								Id: x.id,
								Name: x.name
							};
						})));
				} else {
					resolve();
				}
			});
		}
	},
	data: getDefaultValue,
	mounted() {
		$(this.elId)
			.on('hidden.bs.modal', () => this.close());
	},
	methods: {
		close() {
			this.$emit("close");
			Object.assign(this.$data, getDefaultValue());
		},
		addPoint() {
			var dependency = this.dependency;
			var offset = this.getOffsetByDependency(this.dependency);

			var points = [];
			var point = _.merge(this.endPoint, {
				offsetX: offset.x,
				offsetY: offset.y + this.offsetYDelta
			});
			var endPoint: any = point;

			points.push(point);
			if (dependency.length > 1) {
				var addPoint = {
					name: uniqId(),
					Label: this.aggregationLabel,
					Options: {
						type: PointType.aggregator,
						aggregation: this.aggregation
					},
					offsetX: offset.x,
					offsetY: offset.y + this.offsetYDelta / 2
				};
				points.push(addPoint);
				endPoint = addPoint;
				dependency.push({
					End: point,
					Start: endPoint,
					Name: uniqId(),
					Rules: []
				});
			}
			dependency.filter(x => x.End === null).forEach(x => x.End = endPoint);
			this.$emit("commit-point", {
				points: points,
				dependency: dependency
			});

		},
		changePoint() {
			this.$emit("commit-point", {
				points: [this.point],
				dependency: this.dependency
			});
		},
		onRuleChange(val) {
			var index = val.index;
			Vue.set(this.rules, index, val);
		},
		onSelectCharRuleChange(val) {
			//this.point.Values = val.Values;
			//this.point.Roles = val.Roles;
		},
		getOffsetByDependency(dependencies) {
			var dep: any = _.first(dependencies);
			return {
				x: dep.Start.offsetX,
				y: dep.Start.offsetY
			};
		}
	},
	watch: {
		show(val) {
			if (val) {
				$(this.elId).modal("show");
			} else {
				$(this.elId).modal("hide");
			}
		},
		defaultPoint(defaultPoint) {
			if (defaultPoint) {
				this.point = defaultPoint;
			}
		},
		default_dependency(dep) {
			this.dependency = _Vue.util.extend([], dep);
		}
	}
});