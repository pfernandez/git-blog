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

// TODO: Avoid redeclaration errors by not running this after navigating back
// to the same page. Maybe add a class to the `md` element?
const injectScripts = el =>
  el.querySelectorAll('script, .language-live-js')
    .forEach(s => s.after(script({ className: 'injected' }, s.innerText)))

const injectMarkdown = el => (update(el), injectScripts(el))

const renderString = markdown => update(md(markdown, props))

export default (markdown, props) =>
  (fetch(markdown).then(response => response.text())
      .then(markdown => injectMarkdown(md(markdown, props)))
      .catch(result => isString(result)
        ? renderString(result)
        : console.error(result)),
  md('', props))

