import hljs from '/lib/highlight/es/core.min.js'
import javascript from '/lib/highlight/es/languages/javascript.min.js'

const {registerLanguage, highlight} = hljs
const {markdownit} = window

registerLanguage('javascript', javascript)

const parseCodeBlock = (str, language) =>
  language === 'live-js'
    ? highlight(str, {language: 'javascript'}).value
    : highlight(str, {language}).value

const config = {html: true,
                linkify: true,
                highlight: parseCodeBlock}

const md = (markdown = '', props = {}) =>
  createElement('md', {innerHTML: markdownit(config).render(markdown),
                       ...props})

/**
 * Because inline scripts have already been run, rerendering them (i.e. when
 * navigating away from, then back to content without a page refresh) will cause
 * redecalaration errors for any `const` or `let` statements. To work around
 * this we suppress errors during all script injections after the initial load
 * by causing `window.onerror` to return `false`.
 */
let loaded = false
const temp = window.onerror

const replaceScripts = el =>
  el.querySelectorAll('script, .language-live-js')
    .forEach(s => s.tagName.toLowerCase() === 'script'
      ? s.replaceWith(script(s.innerText))
      : s.after(script(s.innerText)))

const injectScripts = el =>
  (window.onerror = () => loaded,
  replaceScripts(el),
  window.onerror = temp,
  loaded = true)

const injectMarkdown = el =>
  (update(el), injectScripts(el))

const renderMarkdown = (markdown, props) =>
  (fetch(markdown).then(response => response.text())
                  .then(markdown => injectMarkdown(md(markdown, props)))
                  .catch(result => isString(result)
                    ? update(md(markdown, props))
                    : console.error(result)),
  md('', props))

export default (markdown, props) => renderMarkdown(markdown, props)
