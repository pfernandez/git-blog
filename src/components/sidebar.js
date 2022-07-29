import post from '/components/post.js'

on('popstate', () => update(post(pathname)))

export default posts =>
  ul(map(entries(posts), ([path, {label}]) =>
    li(button({onclick: () => (update(post(path)), navigateTo(path))},
              label))))
