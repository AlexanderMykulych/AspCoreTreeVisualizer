import Vue from "vue";
declare const $: any;

export default Vue.extend({
	template: "#add-depend-point",
	props: ["show", "id", "startpoints"],
	computed: {
		elId() {
			return "#add-depend-point_" + this.id;
		}
	},
	data() {
		return {
			point: null
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
			this.$emit("addpoint", this.point);
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