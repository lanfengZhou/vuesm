const fun = ({commit},room_id) => {
  commit({
    type: 'getRoom',    
    id: room_id
  });
};
const setCtrlType=({commit},ctrltype)=>{
	commit('setType',{
		type:ctrltype
	})
}
const setSwitchStatus=({commit},switchstatus)=>{
	commit('setStatus',{
		status:switchstatus
	})
}
export {
	fun,
	setCtrlType,
	setSwitchStatus
}