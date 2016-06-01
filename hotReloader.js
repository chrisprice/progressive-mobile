import HotReloader from 'systemjs-hot-reloader'

const hotReloader = new HotReloader('http://localhost:5776')

let name
hotReloader.on('change', _name => {
  name = _name
  // eslint-disable-next-line no-console
  console.clear()
})

hotReloader.on('moduleRecordNotFound', () => {
  if (name.endsWith('.css')) {
    // It's a CSS file, build the new <link> tag.
    let newLink = document.createElement('link')
    newLink.type = 'text/css'
    newLink.rel = 'stylesheet'

    let links = document.getElementsByTagName('link')
    for (let link of links) {
      // Find the <link> that holds the CSS file, and replace it with the new node.
      // We add a `?` and random value to force a refresh of the CSS.
      let oldHref = link.href
      if (oldHref.indexOf('?') != -1) {
        oldHref = oldHref.substr(0, oldHref.indexOf('?'))
      }

      if (oldHref.endsWith(name)) {
        let newHash = Math.round(Math.random() * 1e10)
        let baseUrl = oldHref.substr(0, oldHref.indexOf(name))
        newLink.href = `${baseUrl}${name}?${newHash}`
        link.parentNode.replaceChild(newLink, link)
      }
    }
  }
})
