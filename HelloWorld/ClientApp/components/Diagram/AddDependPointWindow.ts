import Vue from "vue";
import { SweetModal } from 'sweet-modal-vue';

var bus = new Vue();
export default Vue.extend({
	template: "#add-depend-point",
	components: {
		SweetModal
	},
	created() {
		bus.$on("add-depend-point", function () {
			debugger;
		});
	},
	methods: {
		open: function () {
			this.$refs.modal.open()
		}
	}
});