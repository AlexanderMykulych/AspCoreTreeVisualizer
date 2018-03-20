import Vue from "vue";
import _ from 'lodash';
import { uniqId } from "../../mixins/IdGenerator";
import AsyncSelect from "../AsyncSelect/AsyncSelectComponent";
declare const $: any;
declare const Object: any;

export default Vue.extend({
	template: "#add-graph",
	props: ["categories"],
	data() {
		return {
			show: false,
			elId: null
		}
	},
	mounted() {
		$(this.elId)
			.on('hidden.bs.modal', () => this.close());
	},
	created() {
		this.elId = uniqId();
	},
	methods: {
		close() {
			this.$emit("close");
		}
	},
	watch: {
		show(val) {
			if (val) {
				$(this.elId).modal("show");
			} else {
				$(this.elId).modal("hide");
			}
		}
	}
});