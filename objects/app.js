
const genId = () => '_' + Math.random().toString(36).substr(2, 9);


function highlightItem(e) {
   if (e.target.nodeName === "LI") {
      if (e.target.classList.contains('highlight'))
         return
      for (const item of this.children) {
         item.classList.remove('highlight')
      }
      e.target.classList.add('highlight')
      document.getElementById("h"+this.id).innerHTML = e.target.innerHTML
   }
}

function ListItem(value) {
   const self = document.createElement('li')
   self.innerHTML = value

   self.methods = {
      updateValue: (newValue) => {
         self.innerHTML = newValue
      }
   }

   return self
}

function List() {
   const self = document.createElement('ul')
   self.id = genId()
   self.setAttribute('id', self.id)
   self.addEventListener('click', highlightItem)

   self.methods = {
      getItems: () => self.getElementsByTagName('li'),

      updateItem: (index, data) => {
         self.items[index].updateValue(data)
      },

      addItem: (ListItem) => {
         self.appendChild(ListItem)
      },

      removeItem: (ListItem) => {
         self.removeChild(ListItem)
      }
   }

   return self
}

function App() {
   const self = document.getElementById('content')
   const list = List()
   const section = document.createElement('section')
   section.className = "list-component"
   self.appendChild(section)

   const header = document.createElement('h2')
   header.innerHTML = `List | Selected \<span id="h${list.id}">\</span>`

   section.appendChild(header)
   section.appendChild(list)

   for (let i = 0; i < 10; i++) {
      let item = ListItem("Item " + i)
      list.methods.addItem(item)
   }

   return self
}


document.addEventListener('DOMContentLoaded', App)
