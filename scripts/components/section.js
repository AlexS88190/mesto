export default class Section {
    constructor({items, renderer}, selector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }

    renderItems() {
        this._items.forEach((item) => {
            const renderedItem = this._renderer(item);
            this.addItem(renderedItem);
        })
    }

    addItem(itemHtml) {
        this._container.prepend(itemHtml)
    }
}