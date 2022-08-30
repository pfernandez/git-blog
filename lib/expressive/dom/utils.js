
export const urlParam =
  (name, value = '', params = new URLSearchParams(location.search)) =>
    value
      ? (params.set(name, value), location.search = params)
      : params.get(name) || ''

export const on = addEventListener

export const navigateTo = (pathname, callback) =>
  (history.pushState({}, '', pathname), callback())
