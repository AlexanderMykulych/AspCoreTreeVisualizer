import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash";
import AppHello from "./components/AppHello";
import lodashMixin from "./mixins/m_lodash";
import asyncData from "vue-async-data-2";

//Plugin
Vue.use(asyncData.AsyncDataPlugin);


//Root Component
let v = new Vue({
    el: "#app-root",
	template: '<AppHello/>',
    //render: h => h(AppHelloComponent),
    components: {
		AppHello
    }
});