import Vue from "vue";
import _ from 'lodash';
import RuleControll from "./RuleControll";
declare const $: any;

export default Vue.extend({
	template: "#add-depend-point",
	props: ["show", "id", "startpoints", "characteristics"],
	components: {
		RuleControll
	},
	computed: {
		elId() {
			return "#add-depend-point_" + this.id;
		}
	},
	data() {
		return {
			point: null,
			selectedCharacteristic: null,
			togglesValues: []
		};
	},
	mounted() {
		var $this = this;
		$(this.elId).on('hidden.bs.modal', function () {
			$this.show = false;
		});
	},
	methods: {
		addPoint: function () {
			var point = _.merge({
					name: this.point
				},
				{
					options: {
						Characteristic: this.selectedCharacteristic,
						Values: this.togglesValues
					}
				}
			);
			this.$emit("addpoint", point);
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
		selectedCharacteristic(val) {
			this.togglesValues = [];
		}
	}
});