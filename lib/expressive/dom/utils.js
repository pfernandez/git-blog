
export const urlParam = (name, value = '', encode = true) => {
  const params = new URLSearchParams(location.search)
  return value
    ? (params.set(name, value),
      // TODO: Avoid page refresh
      location.search = encode ? params : decodeURIComponent(params))
    : params.get(name) || '' }

export const on = addEventListener

export const navigateTo = (pathname, callback) =>
  (history.pushState({}, '', pathname), callback())
