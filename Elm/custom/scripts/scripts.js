options.dependencies.forEach(dep => {
  if (dep.src.indexOf('plugin/highlight/highlight.js') == -1) {
    return
  }

  var cb = dep.callback
  dep.callback = function() {
    document.querySelectorAll('section').forEach(v => {
      var updatedHtml = v.innerHTML
        .split('\n')
        .map(line => {
          if (line == '<p>﹇</p>') {
            return `<div class="fragment">`
          } else if (line == '<p>⎵</p>') {
            return '</div>'
          } else if (line == '<p>⁅</p>') {
            return '<div class="fragment halffade">'
          } else if (line == '<p>⁆</p>') {
            return '</div>'
          } else {
            return line
              .replace(/﹇/, `<span class="fragment">️️⬜️`)
              .replace(/⎵/, '⬜️</span>')
              .replace(/⁅/, '<span class="fragment halffade">⬜️')
              .replace(/⁆/, '⬜️</span>')
          }
        })
        .join('\n')
        .replace(/⬜️\s/g, '')
        .replace(/\s?⬜️/g, '')

      v.innerHTML = updatedHtml
    })
    cb()
  }
})
