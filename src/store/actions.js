export const fun = ({commit},id) => {
  commit({
    type: 'getRoom',     //对应mutation.js中的getMsg方法
    id: id
  });
};