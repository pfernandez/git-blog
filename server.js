import {createServer} from 'livereload'
import express from 'express'
import {resolve} from 'path'

const basePath = '/git-blog',
      port = 3000

const path = resolve(),
      staticPath = express.static(path)

express()
  .use(staticPath)
  .use(basePath, staticPath)
  .get('*', (_, res) => res.sendFile(resolve('404.html')))
  .listen(port, () => console.log(`Running at http://localhost:${port}`))

createServer({exts: ['css', 'html', 'js', 'md']}).watch(path)
