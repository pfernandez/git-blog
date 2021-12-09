import express from 'express'
import { createServer } from 'livereload'

const main = 'index.js',
      path = 'src',
      port = 3000

express()
  .use(express.static(path))
  .get('/favicon.ico', (_, res) => res.status(204).end())
  .get('/', (_, res) => res.send(`
    <script src="//localhost:35729/livereload.js"></script>
    <script type="module" src="${main}"></script>
  `))
  .listen(port, () => console.log(`Running at http://localhost:${port}`))

createServer().watch(path)
