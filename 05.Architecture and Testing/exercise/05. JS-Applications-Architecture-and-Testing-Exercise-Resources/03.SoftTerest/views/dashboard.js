import { getAllIdeas } from "../data/data.js"
import {html, render} from '../node_modules/lit-html/lit-html.js'
import { ideaTemplate, noIdea } from "../templates/template.js";

let context = null

const dashBoardSection = document.getElementById('dashboard-holder')
dashBoardSection.addEventListener('click',showDetails)
export async function showDashboard(ctx) {
    context = ctx
    ctx.showTargetSection(dashBoardSection)
      
    const ideas = await getAllIdeas();
    
    if(ideas.length == 0) {
        render(noIdea(),dashBoardSection)
    } else {
        const result = render(ideas.map(ideaTemplate),dashBoardSection)
       
    }

}

function showDetails(e) {
    e.preventDefault() 
    if(e.target.tagName == 'A') {
        let id = e.target.dataset.id

       
        context.goTo('/Details',id)
    }

}