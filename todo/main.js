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
        if (this.selected) {
            this.discardButton.classList.add('hide');
            this.selected.textContent = this.previous
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

    unClick({ target }) {
        if (!target.dataset.item)
            return;

        if (this.selected) {
            if (this.selected.isEqualNode(target))
                return;

            this.selected.classList.remove('selected');
            this.selected.setAttribute('contenteditable', false);
        }   
    }

    onClick({ target }) {
        if (!target.dataset.item) {
            return;
        }
            

        if (this.selected && this.selected.isEqualNode(target))
            return;
        
        this.selected = target;
        this.previous = this.selected.textContent;
        this.selected.setAttribute('contenteditable', true);
        this.discardButton.classList.remove('hide');

        target.classList.add('selected');
    }

    buttonClick({ target }) {

        const {action} = target.dataset;
        if (!action)
            return;
        
        this[action](target);
    }

}

new Todo(list1, document.querySelector('.buttons'));
new Todo(list2, document.querySelector('.buttons2'));