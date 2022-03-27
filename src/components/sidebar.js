// TODO: Fix the simple case, then uncomment.

// import post from './post.js'

// on('popstate', () => main(post(pathname)))

export default posts =>
  ul(map(entries(posts), ([path, { label }]) =>
    li(button(
      // { onclick: () => (main(post(path)), navigateTo(path)) }
      // { onclick: () => main(path) },
      { onclick: () => main(p(path)) },
      label))))
