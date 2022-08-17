
export const on = addEventListener

export const navigateTo = (pathname, callback) =>
  (history.pushState({}, '', pathname), callback())
