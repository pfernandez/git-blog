import {createServer} from 'livereload'
import express from 'express'

const port = 3000

express()
  .use(express.static('src'), express.static('node_modules'))
  .get('*', (_, res) =>
    res.send(`<!doctype html>
              <link rel="icon" href="data:x-icon">
              <script src="markdown-it/dist/markdown-it.min.js"></script>
              <script src="//localhost:35729/livereload.js"></script>
              <script type="module" src="index.js"></script>`))
  .listen(port, () => console.log(`Running at http://localhost:${port}`))

createServer({exts: ['js', 'md', 'css']}).watch('src')
