
// generate a vNode
function generateVNode(node, children) {
   if (typeof node === 'string')
      return node
   if (node.children)
      children = children.map(child => generateVNode(child.node, child.children))
   return { node: node.tag.toUpperCase(), children: children || []}
}

// create a real element from a vNode
function createElement(vnode) {
  if (typeof vnode === 'string') {
    return document.createTextNode(vnode)
  }

  const $el = document.createElement(vnode.node.toLowerCase())
  $el.append(...vnode.children.map(createElement))

  return $el
}

/**
    @param Node       $node --- A real DOM node
    @param Object     vnode --- vDom representation
*/
function equals($node, vnode) {
   if (typeof vnode === 'string') {
      return $node.nodeValue == vnode
   }

   return vnode.node == $node.nodeName
}

// Update the DOM
function updateDOM($parent, node, vnode) {
   // node doesn't exit
   if (!node && !vnode)
      return

   if (!node) {
      $parent.appendChild(createElement(vnode))
   // vnode doesn't exist (ie real node needs to be deleted)
   } else if (!vnode) {
      $parent.removeChild(node)
   // else nodes aren't equal
   } else if (!equals(node, vnode)) {
      $parent.replaceChild(createElement(vnode), node)
   // else nodes are equal
   } else {
      // update children if needed
      for (let i in vnode.children) {
         updateDOM(node, node.childNodes[i], vnode.children[i])
      }
   }

}


function Model(fetch) {
   this.post = 0
   this.getPost = function() {
      return fetch(`https://jsonplaceholder.typicode.com/posts/${this.post}`)
               .then(response => response.json())
   }

   this.getViewModel = function() {
      return this.getPost(this.post++)
         .then(model => {
            const virtualDOM = generateVNode({ tag: 'section' }, [])
            virtualDOM.children.push(generateVNode({ tag: 'h3' }, [ model.title ]))
            virtualDOM.children.push(generateVNode({ tag: 'article' },
               model.body.split('\n').map(line => generateVNode({ tag: 'P' }, [ line ]))))
            return [ virtualDOM ]
         })
   }
}


function View(root) {
   this.root = root

   this.render = function(vDOM) {
      for (let child in vDOM) {
         updateDOM(this.root, this.root.childNodes[child], vDOM[child])
      }
   }
}

function nextButton() {
   const button = document.createElement('button')
   document.getElementById('content').appendChild(button)
   button.setAttribute('id', 'next')
   button.innerHTML = "Next"

   return button
}

const App = {

   view : null,
   model : null,

   init (view, model, button) {
      this.view   = view
      this.model  = model
      this.button = button
   },

   triggerUpdate() {
      this.model.getViewModel()
         .then(this.view.render)
   }
}

function init() {
   const root       = document.getElementById('root')
   const view       = new View(root)
   const model      = new Model(window.fetch)
   const button     = nextButton()
   App.init( view, model)
   button.addEventListener('click', App.triggerUpdate.bind(App))
}

document.addEventListener('DOMContentLoaded', init)
