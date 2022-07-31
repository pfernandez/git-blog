import express from 'express'
import {createServer} from 'livereload'
import {resolve} from 'path'

const port = 3000,
      path = resolve()

express()
  .use(express.static(path))
  .get('*', (_, res) => res.sendFile(resolve('index.html')))
  .listen(port, () => console.log(`Running at http://localhost:${port}`))

createServer({exts: ['js', 'md', 'css']}).watch(path)
