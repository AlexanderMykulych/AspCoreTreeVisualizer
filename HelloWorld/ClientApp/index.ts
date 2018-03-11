import Vue from "vue";
import Vuex from "vuex";
import AppHello from "./components/AppHello";


//Vuex plugin


//Root Component
let v = new Vue({
    el: "#app-root",
	template: '<AppHello/>',
    //render: h => h(AppHelloComponent),
    components: {
		AppHello
    }
});