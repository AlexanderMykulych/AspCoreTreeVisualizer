import Vue from "vue";

export default Vue.extend({
	template: "#rule-controll",
	props: ["point", "index", "roles"],
	data() {
		return {
			togglesValues: [],
			togglesRoles: []
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
				Roles: this.togglesRoles,
				index: this.index
			};
			this.$emit("rule-change", value);
		}
	}
});