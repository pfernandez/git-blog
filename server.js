import express from 'express'
import { createServer as livereload } from 'livereload'

const html = '<script type="module" src="index.js"></script>',
      path = new URL('./src', import.meta.url).pathname,
      port = 3000

express()
  .use(express.static(path))
  .get('/favicon.ico', (_, res) => res.status(204).end())
  .get('/', (_, res) => res.send(html))
  .listen(port, () => console.log(`Running at http://localhost:${port}`))

livereload().watch(path)
