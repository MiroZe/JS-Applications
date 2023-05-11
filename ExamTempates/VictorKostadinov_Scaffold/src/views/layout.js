import {html} from '../../node_modules/lit-html/lit-html.js'

//TODO replace with actual layout according HTML structure

export const layoutTemplate =(userData,content) => html `

 ${userData ? html`` : html ``}



<main>
    ${content}
</main>
`