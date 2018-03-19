import _ from "lodash";
import Vue from "vue";
import { mapActions } from "vuex";
//При компиляции typescript выскакивает ошибка "не находит свойства togglesRoles" только когда props: Object
//Обходное решение
var VueP: any = Vue;

export default VueP.extend({
	template: "#rule-controll",
	props: {
		point: Object,
		index: [Number, String],
		roles: Array,
		roleWithDetail: {
			type: Boolean,
			default: false
		},
		togglesValues: {
			type: Array,
			default: []
		},
		togglesRoles: {
			type: Array,
			default: []
		}
	},
	data() {
		return {
			selectedRole: null
		};
	},
	methods: {
		onRoleSelectClick() {
			this.addRole({
				role: this.selectedRole
			});
		},
		addRole(roleInfo) {
			this.togglesRoles.push(roleInfo);
		},
		removeRoleByIndex(index) {
			this.togglesRoles.splice(index, 1);
		}
	},
	computed: {
		uniq() {
			return "_" + this.index;
		},
		existsRoles() {
			return this.roles.filter(x =>
				_.findIndex(this.togglesRoles, (y: any) => y.role.Name == x.Name) < 0
			);
		},
		sync_togglesValues: {
			get() {
				return !_.isArray(this.togglesValues) ? [] : this.togglesValues;
			},
			set(val) {
				this.$emit("update:togglesValues", val);
			}
		},
		sync_togglesRoles: {
			get() {
				return !_.isArray(this.togglesRoles) ? [] : this.togglesRoles;
			},
			set(val) {
				this.$emit("update:togglesRoles", val);
			}
		}
	}
});