const createMenuNode = (item) => {
    if (!item)
        return
    const $el = document.createElement('div')
    $el.className = 'node'
    const [[key, children]] = Object.entries(item)
    $el.append(
        key,
        ...children.map(createMenuNode)
    )
    return $el
}

class CollapseMenu {
    constructor($root, data) {
        this.$root = $root
        this.$root.addEventListener('click', this.onClick.bind(this))
        this.$root.append(
            ...data.map(createMenuNode)
        )
    }

    onClick({ target }) {
        if (target.hasAttribute('data-collapsed'))
            target.removeAttribute('data-collapsed')
        else
            target.setAttribute('data-collapsed', "")
    }
}

const sampleData = [
    {
        'pears': [
            {
                'green': []
            },
            {
                'red': [
                    {
                        'light': []
                    },
                    {
                        'heavy': []
                    }
                ]
            },
        ],
    },
    {
        'apples': [
            {
                'pink lady': []
            }

        ],
    },
    {
        'bananas': [],
    }

]

document.addEventListener('DOMContentLoaded', () => {
    new CollapseMenu(
        app,
        sampleData
    )
})