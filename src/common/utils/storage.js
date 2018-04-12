/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
// export const getStore = name => {
//   if (!name) return;
//   return window.localStorage.getItem(name);
// }
// export const getStore = name => {
//   if (!name) return;
//   return JSON.parse(window.localStorage.getItem(name));
// }
export const getStore = name => {
  if (!name) return
  var local = window.localStorage.getItem(name)
  if (!local) return
  return JSON.parse(local);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
}