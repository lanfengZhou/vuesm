import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
// import * as mutations from './mutations';
import * as getters from './getters';
import room from './modules/room';
import ctrltype from './modules/ctrltype';

Vue.use(Vuex)

const store = new Vuex.Store({
  actions,
  getters,
  modules:{
  	room,
  	ctrltype,
  },
  // mutations
})
export default store;