const range = (size) => Array(10).fill(null);

function createBox(index) {
  const box = document.createElement('div');

  box.className = 'box';
  box.appendChild

  const p = document.createElement('p')
  p.textContent = index;
  p.className = 'text';
  box.setAttribute('draggable', true);

  box.appendChild(p)

  return box;
}

function init() {
  window.addEventListener('dragstart', dragstart, false);

  range(10).reduce((parent, _, index) => {
    parent.appendChild(createBox(index))
    
    return parent;
  }, document.getElementById('content'));
}

function dragstart(e) {

  if (!e.target.classList.contains('box'))
    return false
  
  const data = e.target.textContent;
  e.stopPropagation();

  function drop() {}

  function dragend() {
    // cleanup
    window.removeEventListener('dragend',  dragend);
    window.removeEventListener('dragover', dragover);
    window.removeEventListener('drop', drop);
  }

  function dragover(e) {
    e.preventDefault();
    
    if (e.target.classList.contains('box')) {
      e.target.addEventListener('dragleave', dragleave(e.target), false);
      e.target.classList.add('potential');
    }
     
    function dragleave(target) {
      console.log('adding', target);
      return function handler() {
        console.log('leaving')
        target.classList.remove('potential');
        target.removeEventListener('dragleave', handler);
      }
    }
  }

  window.addEventListener('dragend', dragend, false);
  window.addEventListener('dragover', dragover, false);
}

document.addEventListener('DOMContentLoaded', init)


