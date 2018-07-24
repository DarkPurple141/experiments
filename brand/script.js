(function() {
   'use strict';
   const d = document

   const main = d.createElement('main')

   const range = (num) =>
      Array(num)
      .fill(null)

   function sectionBuilder() {
      const item = d.createElement('section')
      const h1   = d.createElement('h1')
      const text = d.createTextNode("Title")
      const p    = d.createElement('p')
      p.innerText = "This some random text that might sit here."

      h1.appendChild(text)
      item.appendChild(h1)
      item.appendChild(p)

      return item
   }

   const sections =
      range(5)
      .map(sectionBuilder)
      .forEach(el => {
         main.appendChild(el)
      })

   d.body.appendChild(main)
}())
