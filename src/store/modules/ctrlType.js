//init state
const state = {
  type:'1234',
  switchStatus:''
}
//getters
const getters={
	type:state => state.type,
	switchStatus:state => state.switchStatus,
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
	},
	setStatus(state,status){
		state.switchStatus=status.status
	}
}
export default {
  state,
  getters,
  actions,
  mutations
}