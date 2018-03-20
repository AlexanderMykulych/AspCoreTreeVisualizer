import Vue from "vue";
import ModalWindow from "../ModalWindow";

export default Vue.extend({
	template: "#standart-modal-window",
	props: ["title", "show"],
	methods: {
		close() {
			this.$emit("close");
		}
	},
	components: {
		ModalWindow
	}
});