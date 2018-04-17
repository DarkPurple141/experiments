

function greet(string) {
   return "Hello " + string;
}

function update(outputEl) {
   return function(event) {
      if (!event.target.innerHTML !== outputEl.innerHTML)
         outputEl.innerHTML = greet(event.target.innerHTML)
   }
}

function hide(e) {
   e.target.classList.toggle('hide')
}

window.onload = function() {
   const greeting = document.getElementById('greeting')
   document.getElementById('input')
      .addEventListener('input', update(greeting))

   greeting.addEventListener('click', hide)
}
