import {createServer} from 'livereload'
import express from 'express'
import {resolve} from 'path'

const basePath = '/git-blog',
      port = 3000

express()
  .use(express.static(resolve()))
  .use(basePath, express.static(resolve()))
  .get('*', (_, res) =>
    res.sendFile(resolve('index.html')))
  .listen(port, () => console.log(`Running at http://localhost:${port}`))

createServer({exts: ['js', 'md', 'css']}).watch('src')
