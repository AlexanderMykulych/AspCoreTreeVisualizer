import _ from "lodash";
import Vue from "vue";
//При компиляции typescript выскакивает ошибка "не находит свойства togglesRoles" только когда props: Object
//Обходное решение
var VueP: any = Vue;

export default VueP.extend({
	template: "#rule-controll",
	props: {
		point: Object,
		index: [Number, String],
		roles: Array,
		values: Array,
		roleWithDetail: {
			type: Boolean,
			default: false
		},
		roleDetailValues: Array
	},
	data() {
		return {
			togglesValues: [],
			togglesRoles: [],
			defaultValues: [],
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
		}
	},
	watch: {
		point() {
			this.togglesValues = [];
			this.togglesRoles = [];
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