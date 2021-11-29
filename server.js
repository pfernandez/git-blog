import express from 'express'
import { createServer as livereload } from 'livereload'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url)),
      port = 3000

express()
  .use(express.static(join(__dirname, 'src')))
  .get('*', ({ originalUrl }, res) =>
    res.send(
      `<!doctype html>
       <script type="module"
         src="${originalUrl === '/' ? '/index' : originalUrl}.js"></script>`))
  .listen(port, () =>
    console.log(`Server is running at http://localhost:${port}`))

livereload().watch(join(__dirname, 'src'))
