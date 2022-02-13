import express from 'express'
import { createServer as livereload } from 'livereload'

const sourcePath = 'src',
      buildPath = 'dist',
      port = 3000

express()
  .use(express.static(sourcePath))
  .use(express.static(buildPath))
  .get('/data', (_, res) => res.send({ count: 1 }))
  .get('/', (_, res) => res.send(`
    <!doctype html>
    <link rel="icon" href="data:x-icon">
    <script src="//localhost:35729/livereload.js"></script>
    <script src="main.js"></script>
  `))
  .listen(port, () => console.log(`\nRunning at http://localhost:${port}\n`))

livereload().watch(sourcePath)
