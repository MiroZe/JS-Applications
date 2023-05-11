import {html, render} from '../node_modules/lit-html/lit-html.js'


const cardTemplate = (ctx,toggleInfo) => html `<style>
.user-card {
    display: flex;
    font-family: 'Arial', sans-serif;
    background-color: #EEE;
    border-bottom: 5px solid darkorchid;
    width: 100%;
}

.user-card img {
    width: 200px;
    height: 200px;
    border: 1px solid darkorchid;
}

.info {
    display: flex;
    flex-direction: column;
}

.info h3 {
    font-weight: bold;
    margin-top: 1em;
    text-align: center;
}

.info button {
    outline: none;
    border: none;
    cursor: pointer;
    background-color: darkorchid;
    color: white;
    padding: 0.5em 1em;
}

@media only screen and (max-width: 500px) {
    .user-card {
        flex-direction: column;
        margin-bottom: 1em;
    }

    .user-card figure,
    .info button {
        align-self: center;
    }

    .info button {
        margin-bottom: 1em;
    }

    .info p {
        padding-left: 1em;
    }
}
</style>
<div class="user-card">
<figure>
    <img src=${ctx.avatar} />
</figure>
<div class="info">
    <h3>${ctx.name}</h3>

    <div style = "display: ${ctx.visible ? 'block' : 'none'}" >
        <p>
            <slot name=${ctx.name} />
        </p>
        <p>
            <slot name=${ctx.phone} />
        </p>
    </div>

    <button @click = ${toggleInfo} class="toggle-info-btn">${ctx.visible ? 'Hide info' : 'Show more'}</button>
</div>
</div>`

class Card extends HTMLElement {

constructor() {
    super()
    this.state = {
        name: this.getAttribute('name'),
        avatar: this.getAttribute('avatar'),
        visible: true
    }
    this.root = this.attachShadow({mode: 'closed'})
    this.toggleInfo = this.toggleInfo.bind(this)

}
update() {
    render(cardTemplate(this.state,this.toggleInfo),this.root )
}

toggleInfo() {
   
    this.state.visible = !(this.state.visible)
    this.update()
}
connectedCallback() {
    this.update()
}

}

window.customElements.define('profile-card',Card)