const fun = ({commit},id) => {
  commit({
    type: 'getRoom',     //对应mutation.js中的getRoom方法
    id: id
  });
};
const setCtrlType=({commit},type)=>{
	commit({
		type:'setType',
		type:type
	})
}
export {
	fun,
	setCtrlType
}