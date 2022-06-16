import hljs from '../lib/highlight/es/core.min.js'
import javascript from '../lib/highlight/es/languages/javascript.min.js'

const { registerLanguage, highlight } = hljs

registerLanguage('javascript', javascript)

const parseCodeBlock = (str, language) =>
  language === 'live-js'
    ? highlight(str, { language: 'javascript' }).value
    : highlight(str, { language }).value

const config = { html: true,
                 linkify: true,
                 typographer: true,
                 highlight: parseCodeBlock }

const md = (markdown = '', props = {}) =>
  createElement('md', { innerHTML: markdownit(config).render(markdown),
                        ...props })

const varObj = 'MD_' + btoa(Math.random().toString()).substr(10, 5);

// TODO: This misses repeating comma-separated declarations. Consider an AST.
const regex = /\b(?:const|let)\b\s+(\w+)/g

const varNames = []

const replaceUsages = js =>
  ([...js.matchAll(regex)].forEach(matches =>
    matches.forEach(match =>
      js.replace(
        new RegExp(`\\b${match}\\b`, 'g'),
        `${varObj}.${matches[1]}`))),
    js)

const redeclarable = js => script(replaceUsages(js))

const injectVarContainer = () =>
  document.body.prepend(script(`const ${varObj} = {}`))

const injectScripts = el =>
  el.querySelectorAll('script, .language-live-js')
    .forEach(s => s.tagName.toLowerCase() === 'script'
      ? s.replaceWith(redeclarable(s.innerText))
      : s.after(redeclarable(s.innerText)))

const injectMarkdown = el =>
  (update(el), injectVarContainer(), injectScripts(el))

const renderMarkdown = (markdown, props) =>
  (fetch(markdown).then(response => response.text())
      .then(markdown => injectMarkdown(md(markdown, props)))
      .catch(result => isString(result)
        ? update(md(markdown, props))
        : console.error(result)),
  md('', props))

export default (markdown, props) => renderMarkdown(markdown, props)
