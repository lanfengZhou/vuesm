import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';
import state from './modules/room';

Vue.use(Vuex)

const store = new Vuex.Store({
  actions,
  getters,
  state,
  mutations
})
export default store;