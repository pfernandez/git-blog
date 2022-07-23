const {createServer} = require('livereload')
const express = require('express')

const port = 3000

express()
  .use(express.static(__dirname + '/dist'),
       // TODO: Serve the posts from elsewhere?
       express.static(__dirname + '/src'))
  .get('*', (_, res) => res.sendFile(__dirname + '/index.html'))
  .listen(port, () => console.log(`Running at http://localhost:${port}`))

createServer({exts: ['js', 'md', 'css']}).watch('src')
