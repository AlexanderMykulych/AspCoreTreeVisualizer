import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash";
import AppHello from "./components/AppHello";
import lodashMixin from "./mixins/m_lodash";
import asyncData from "vue-async-data-2";
import AsyncComputed from "vue-async-computed";
import vSelect from "vue-select";
import vueResource from "vue-resource";
var _vueResource: any = vueResource;

//Plugin
Vue.use(asyncData.AsyncDataPlugin);
Vue.use(_vueResource);
Vue.use(AsyncComputed);
Vue.component('v-select', vSelect)

var _Vue: any = Vue;
_Vue.http.interceptors.push((request, next) => {
	request.headers.set('Content-Type', 'application/json');
	next();
});

//Root Component
let v = new Vue({
    el: "#app-root",
	template: '<AppHello/>',
    //render: h => h(AppHelloComponent),
    components: {
		AppHello
    }
});