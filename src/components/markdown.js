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

// If the markdown contains a script tag or live-js block that includes a `let`
// or `const`, a rerender will cause a variable redeclaration error when the
// script is injected a second time. But if it isn't injected again, none of its
// effects on the DOM will occur. Hence this hack to replace them with `var`s,
// which can be redeclared.
//
// TODO: These vars could easily overwrite something in the global scope.
// Add them to an object as properties instead. It should work to declare it as
// a constant inside this module.
//
// Picking them out reliably is challenging (though not impossible) using string
// subsitution, so consider using an AST.
const redeclarable = js => script(js.replace(/\bconst\b|\blet\b/g, 'var'))

const injectScripts = el =>
  el.querySelectorAll('script, .language-live-js')
    .forEach(s => s.tagName === script
      ? s.replaceWith(redeclarable(s.innerText))
      : s.after(redeclarable(s.innerText)))

const injectMarkdown = el => (update(el), injectScripts(el))

const renderMarkdown = (markdown, props) =>
  (fetch(markdown).then(response => response.text())
      .then(markdown => injectMarkdown(md(markdown, props)))
      .catch(result => isString(result)
        ? update(md(markdown, props))
        : console.error(result)),
  md('', props))

export default (markdown, props) => renderMarkdown(markdown, props)
