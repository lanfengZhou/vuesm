export const msg = state =>{
	return {
		id:state.room.id,
		type:state.ctrltype.type
	}
}
