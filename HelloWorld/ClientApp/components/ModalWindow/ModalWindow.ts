import Vue from "vue";
import { uniqId } from "../../mixins/IdGenerator";

export default Vue.extend({
	template: "#modal-window",
	props: ["show"],
	data() {
		return {
			elId: null
		};
	},
	computed: {
		selectorId() {
			return "#" + this.elId;
		}
	},
	created() {
		this.elId = uniqId();
	},
	mounted() {
		$(this.selectorId)
			.on('hidden.bs.modal', () => this.close());
	},
	methods: {
		close() {
			this.$emit("close");
		}
	},
	watch: {
		show(val) {
			if (val) {
				$(this.selectorId).modal("show");
			} else {
				$(this.selectorId).modal("hide");
			}
		}
	}
});