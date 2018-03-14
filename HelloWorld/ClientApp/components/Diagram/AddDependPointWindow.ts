import Vue from "vue";
import _ from 'lodash';
import RuleControll from "./RuleControll";
declare const $: any;
declare const Object: any;


function getDefaultData() {
	return {
		point: null,
		required: false,
		defaultValue: null,
		selectedCharacteristic: null,
		togglesValues: [],
		rules: []
	};
};

export default Vue.extend({
	template: "#add-depend-point",
	props: ["show", "id", "startpoints", "characteristics", "roles"],
	components: {
		RuleControll
	},
	computed: {
		elId() {
			return "#add-depend-point_" + this.id;
		}
	},
	data: getDefaultData,
	mounted() {
		$(this.elId)
			.on('hidden.bs.modal', () => this.show = false);
	},
	methods: {
		addPoint() {
			var point = _.merge({
					name: this.point
				},
				{
					options: {
						Characteristic: this.selectedCharacteristic,
						Values: this.togglesValues,
						Required: this.required,
						DefaultValue: this.defaultValue
					}
				}
			);
			this.$emit("addpoint", {
				rules: this.rules,
				point: point
			});
			this.clearData();
		},
		clearData() {
			Object.assign(this.$data, getDefaultData());
		},
		onRuleChange(val) {
			var index = val.index;
			Vue.set(this.rules, index, val);
		}
	},
	watch: {
		show(val) {
			if (val) {
				$(this.elId).modal("show");
				this.clearData();
			} else {
				$(this.elId).modal("hide");
			}
		},
		togglesValues(values) {
			if (values == null || values.length === 0) {
				this.defaultValue = null;
			}
		}
	}
});