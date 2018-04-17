

function startHold(event) {
   console.log("drag start")
   event.target.classList.add('hide')
}

function endHold(event) {
   console.log('drag end')
   event.target.classList.remove('hide')
}

function dragOver(event) {
   event.target.classList.add('target')
}

function dragLeave(event) {
   event.target.classList.remove('target')
}

function dragDrop(event) {
   //dragSrcEl.innerHTML = this.innerHTML;
   //this.innerHTML = e.dataTransfer.getData('text/html');
}

function makeBox(number) {
   const div = document.createElement('div')

   div.className = "box"
   div.setAttribute('draggable', 'true')
   div.addEventListener('dragstart', startHold)
   div.addEventListener('dragend', endHold)
   div.addEventListener('dragover', dragOver)
   div.addEventListener('dragleave', dragLeave)

   const p = document.createElement('p')
   p.innerHTML = number
   div.appendChild(p)

   return div
}


window.onload = function() {
   const main = document.getElementById('content')
   for (let i = 0; i < 50; i++) {
      main.appendChild(makeBox(i))
   }
}
