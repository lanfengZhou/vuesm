const getRoom= (room, payload) => {
  room.id = payload.id;
}
const setType= (ctrltype, payload) => {
  ctrltype.type = payload.type;
}
export {
	getRoom,
	setType
}