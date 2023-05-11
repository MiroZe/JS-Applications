import { getDetailsIdea } from '../data/data.js';
import {html, render} from '../node_modules/lit-html/lit-html.js'
import { detailsTemplate } from '../templates/template.js';

const detailsSection = document.getElementById('details');



export async function showDetailsPage(ctx,id) {
   
    
    ctx.showTargetSection(detailsSection)
    const detailData = await getDetailsIdea(id)
    
    
   render(detailsTemplate(detailData),detailsSection)
   
   

}