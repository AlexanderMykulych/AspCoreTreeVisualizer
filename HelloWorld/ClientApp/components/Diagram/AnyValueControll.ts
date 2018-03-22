import Vue from "vue";
import { CharacteristicType } from "../../Model/PointType";

export default Vue.extend({
	template: "#any-value",
	props: ["type", "value", "label"],
	computed: {
		controllType() {
			switch (this.type) {
				case CharacteristicType.String:
					return "text";
				case CharacteristicType.Int:
					return "number";
				case CharacteristicType.DateTime:
					return "datetime";
				default:
					return null;
			}
		}
	},
	methods: {
		updateValue(value) {
			this.$emit("input", value);
		}
	}
});