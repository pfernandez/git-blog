import hljs from '../lib/highlight/es/core.min.js'
import javascript from '../lib/highlight/es/languages/javascript.min.js'

hljs.registerLanguage('javascript', javascript)

const runScript = (el, str, script = document.createElement('script')) =>
  (script.append(str), el.append(script))

const getResult = () =>
  new MutationObserver((mutationList, observer) => {
    const el = document.querySelector('[class^=language-result]')
    if(el) {
      runScript(document.body, `
        var result = document.createElement('result')
        result.append(${el.innerText})
        document.querySelector('.${el.className}')
                .parentElement
                .replaceWith(result)`)
      observer.disconnect()
    }
  }).observe(document.body, { childList: true, subtree: true })

const processCodeBlock = (el, str, lang) =>
  lang === 'live'
    ? (runScript(el, str), hljs.highlight(str, { language: 'js' }).value)
    : lang.split('-')[0] === 'result'
      ? getResult(el)
      : hljs.highlight(str, { language: lang }).value

const render = (markdown, el) =>
  Object.assign(el,
    { innerHTML: window
      .markdownit(
        { html: true,
          linkify: true,
          typographer: true,
          highlight: (str, lang) => processCodeBlock(el, str, lang) })
      .render(markdown) })

export default (markdown, el = document.createElement('md')) =>
  (fetch(markdown)
    .then(response => response.text())
    .then(text => render(text, el))
    .catch(err => log(err) && render(markdown, el)),
  el)
