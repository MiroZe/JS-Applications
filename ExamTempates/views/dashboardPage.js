import { getAll } from '../api/getData.js'
import {html} from '../node_modules/lit-html/lit-html.js'



      const dashBoardTemplate = (data) => html ``

export async function showDashboardPage(ctx) {
    const data = await getAll()
    
    ctx.render(dashBoardTemplate(data))
    

    
}


function oneItem (item) {
    return html``
}