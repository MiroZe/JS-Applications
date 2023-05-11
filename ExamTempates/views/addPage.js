import { sendCreatedItem } from '../api/getData.js'
import {html} from '../node_modules/lit-html/lit-html.js'


const addTemplate = () => html ``

export  function  showAddPage(ctx) {

    ctx.render(addTemplate())


}