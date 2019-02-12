(function() {

class App {

    constructor($el, data) {
        this.$root = $el
        this.model = data

        this.$tabs = document.createElement('div')
        this.$tabs.classList.add('tabs')
        this.$tabs.addEventListener('click', (e) => {
            if (e.target.classList.contains('tab')) {
                const tab = this.model[
                    e.target.dataset['index']
                ]
                this.$view.innerHTML = tab.body
            }
        })
        this.$tabs.append(
            ...data
                .map(item => item.title)
                .map(this._createTab.bind(this))
        )

        this.$view = document.createElement('div')
        this.$view.classList.add('view')
    
        this.$root.append(this.$tabs, this.$view)
    }

    _createTab(title, index) {
        const tab = document.createElement('div')
        tab.className = 'tab'
        tab.setAttribute('data-index', index)
        tab.textContent = title
        
        return tab
    }

}

window.App = App
})();