class Approot extends HTMLElement {
    constructor() {
        super();
    
    const root = this.attachShadow({mode:'closed'});
    const div = document.createElement('div');
    div.innerHTML = '<h1>Hello Shadow </h1>';
    root.appendChild(div)
    }
}

customElements.define('app-root', Approot)