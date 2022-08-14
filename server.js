import {createServer} from 'livereload'
import express from 'express'
import {resolve} from 'path'

const basePath = '/git-blog',
      port = 3000,
      path = resolve(),
      serveStatic = express.static(path)

express()
  .use(serveStatic)
  .use(basePath, serveStatic)
  .get('*', (_, res) => res.sendFile(resolve('index.html')))
  .listen(port, () => console.log(`Running at http://localhost:${port}`))

createServer({exts: ['css', 'js', 'md']}).watch(path)
