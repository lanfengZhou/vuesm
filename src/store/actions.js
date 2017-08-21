const fun = ({commit},room) => {
  commit({
    type: 'getRoom',    
    id: id
  });
};
const setCtrlType=({commit},ctrltype)=>{
	commit('setType',{
		type:ctrltype
	})
}
export {
	fun,
	setCtrlType
}