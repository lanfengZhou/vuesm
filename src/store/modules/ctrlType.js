//init state
const state = {
  type:'1234'
}
//getters
const getters={
	type:state => state.type
}
//actions
const actions={
	// setCtrlType({commit},type){
	// commit({
	// 	type:'setType',
	// 	type:type
	// })
// }
}
//mutations
const mutations={
	setType(state,type){
  		state.type = type.type;
}
}
export default {
  state,
  getters,
  actions,
  mutations
}