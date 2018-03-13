import Vue from "vue";

export default Vue.extend({
	template: "#rule-controll",
	props: ["point", "index"],
	data() {
		return {
			togglesValues: []
		};
	},
	watch: {
		point() {
			this.togglesValues = [];
		},
		togglesValues() {
			var value = {
				Point: this.point,
				Values: this.togglesValues,
				Roles: null,
				index: this.index
			};
			this.$emit("rule-change", value);
		}
	}
});