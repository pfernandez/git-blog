/**
 * @external Window
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Window}
 */

/**
 * Update the URL, then execute a callback function.
 *
 * @function external:Window#foo
 * @global
 */
export const navigate = (url, callback) =>
  (history.pushState({}, '', url), callback())

export const on = addEventListener

