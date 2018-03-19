import Vue from "vue";
import _ from "lodash";
import { uniqId } from "../../mixins/IdGenerator";

var _Vue: any = Vue;

export default _Vue.extend({
	template: "#async-select",
	props: {
		id: {
			type: String,
			default: uniqId()
		},
		url: String
	},
	computed: {
		sync_id() {
			return "select_" + this.id;
		}
	},
	asyncData: {
		userName() {
			return new Promise((resolve, reject) => {
				setTimeout(_ => {
					if (Math.random() > 0.5) {
						resolve('risa');
					} else {
						reject('fetch error...');
					}
				}, 1000);
			})
		}
	}
});
