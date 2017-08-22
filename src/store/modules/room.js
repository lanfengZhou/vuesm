//init state
const state = {
  id:''
}
//getters
const getters={
	id:state => state.id
}
//actions
const actions={

}
//mutations
const mutations={
	getRoom(state,type){
  		state.id = type.id;
	}
}
export default {
  state,
  getters,
  actions,
  mutations
}