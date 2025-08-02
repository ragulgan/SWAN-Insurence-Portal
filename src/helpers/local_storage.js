export const setLocalStorage = (key, varToSet) => localStorage.setItem(key, window.btoa(varToSet))

export const getLocalStorage = (key) => {
  const getStorage = localStorage.getItem(key)
  try {
    return getStorage ? window.atob(getStorage) : false
  } catch (e) {
    return false
  }
}

export const unsetLocalStorage = () => localStorage.clear()
