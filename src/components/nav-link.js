const navLink = (text, pathname) =>
  button({ onclick: () => history.pushState({}, '', pathname) }, text)

export default navLink
