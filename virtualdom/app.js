
function Model(fetch) {
   this.post = 0
   this.getPost = function() {
      return fetch(`https://jsonplaceholder.typicode.com/posts/${this.post}`)
               .then(response => response.json())
   }

   this.getViewModel = function() {
      return this.getPost(this.post++)
   }
}


function View(root) {
   this.root = root

   this.render = function(article) {
      this.root.innerHTML =
      `<section class="article">
         <h3 class="article-header">${article.title}</h3>
         <article class="article-content">${article.content}</article>
      </section>`
   }
}

function nextButton() {
   const button = document.createElement('button')
   document.getElementById('content').appendChild(button)
   button.setAttribute('id', 'next')
   button.innerHTML = "Next"

   return button
}

const Controller = {

   view : null,
   model : null,
   button: null,

   init: function({ view, model, button }) {
      this.view   = view
      this.model  = model
      this.button = button
      this.view.render({title: "Nothing yet.", content: "Click the button"})
   },

   triggerUpdate: function() {
      this.model.getViewModel()
         .then(data => {
            return {
               content: data.body,
               title  : data.title,
               author: "Alex"
            }
         })
         .then(this.view.render)
   }
}

function init() {
   const root = document.getElementById('root')
   const view       = new View(root)
   const model      = new Model(window.fetch)
   const button     = nextButton()
   Controller.init({ view, model, button })
   button.addEventListener('click', Controller.triggerUpdate.bind(Controller))
}

document.addEventListener('DOMContentLoaded', init)
