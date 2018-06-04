
function addNode(root, node) {
   if (!root) {
      return node
   } else {
      if (root.val > node.val)
         root.left = addNode(root.left, node)
      else
         root.right = addNode(root.right, node)
   }
   return root
}

function bfs(fn, node) {
   if (!node) {
      return
   } else {
      fn(node.val)
      bfs(fn, node.left)
      bfs(fn, node.right)
   }
}

class Leaf {
   constructor(val) {
      this.val = val
      this.left = null
      this.right = null
   }
}

class BST {
   constructor() {
      this.root = null
      this.size = 0
   }

   bfs(fn) {
      bfs(fn, this.root)
   }

   add(...vals) {
      for (let val in vals) {
         this.root = addNode(this.root, new Leaf(vals[val]))
         this.size++
      }
   }

   inorder(fn) {

   }

   preorder(fn) {

   }
}

const tree = new BST()
tree.add(1, 2, 3, 4)

const print = (val) => console.log(val)

tree.bfs(print)
