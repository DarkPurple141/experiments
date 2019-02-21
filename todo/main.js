// list is our list

class Item {
    constructor(val) {
        this._elem = document.createElement('li');
        this._elem.textContent = val;
        this._elem.setAttribute('data-item', true);
        this._elem.setAttribute('tabindex', 0);
        this._elem.setAttribute('contenteditable', false);
    }

    setContent(content) {
        this._elem.textContent = content
    }
}

class Todo {
    constructor(root, controls) {
        this._elem = root;
        this._elem.onclick    = this.onClick.bind(this);
        this._elem.addEventListener('focusout', this.unClick.bind(this), false);
        this.controls = controls;
        this.controls.onclick = this.buttonClick.bind(this);
        this.discardButton = controls.querySelector('button[data-action="discard"');
        this.selected = null;
        this.previous = '';
    }

    add() {
        console.log('adding')
        this._elem.appendChild(new Item('new')._elem)
    }

    delete() {
        console.log('deleting')
        if (this.selected)
            this._elem.removeChild(this.selected);

        this.selected = null;
    }

    discard() {
        console.info('discard')
        if (this.selected) {
            this.selected.textContent = this.previous
            this.removeEditable()
        }
    }

    sort() {
        const parent = this._elem.parentNode;
        const ref    = this._elem.nextSibling;
        const root   = parent.removeChild(this._elem);

        [...this._elem.children]
            .sort((a, b) => 
                a.textContent === b.textContent ? 
                0 : a.textContent > b.textContent ? 1 : -1)
            .forEach(item => this._elem.appendChild(item));

        this._elem = parent.insertBefore(root, ref);
    }

    removeEditable() {
        this.selected.removeAttribute('contenteditable');
    }

    unClick({ target }) {
        if (!target.hasAttribute('data-item'))
            return

        if (this.selected) {
            this.removeEditable()
        }   
    }

    onClick({ target }) {
        if (!target.hasAttribute('data-item')) {
            return;
        }

        if (this.selected && this.selected.isEqualNode(target))
            return;
        else
            this.previous = this.selected.textContent;
        
        this.selected = target;
        
        this.selected.setAttribute('contenteditable', true);
        this.discardButton.classList.remove('hide');
    }

    buttonClick({ target }) {   
        const {action} = target.dataset;
        if (!action)
            return;
        
        this[action](target);

        this.selected = null
    }

}

new Todo(list1, document.querySelector('.buttons'));
new Todo(list2, document.querySelector('.buttons2'));