import { deleteIdea } from '../data/data.js'
import {html} from '../node_modules/lit-html/lit-html.js'

const dashBoardSection = document.getElementById('dashboard-holder')

export const ideaTemplate = (data) => html`
<div class="card overflow-hidden current-card details" style="width: 20rem; height: 18rem;">
<div class="card-body">
    <p class="card-text">${data.title}</p>
</div>
<img class="card-image" src=${data.img} alt="Card image cap">
<a data-id = ${data._id} class="btn" href="/Details">Details</a>
</div>`


export const noIdea = () => html`<h1>No ideas yet! Be the first one :)</h1>`

let isOwner;
let userID;

export const detailsTemplate = (data) => html`
<img class="det-img" src=${data.img} />
<div class="desc">
    <h2 class="display-5">${data.title}</h2>
    <p class="infoType">Description:</p>
    <p class="idea-description">${data.description}</p>
</div> ${check(data) ? html`
<div class="text-center">
<a class="btn detb" @click = ${(e) => {e.preventDefault();deleteDetail(data._id)}} href="/Delete">Delete</a>
</div>`:null}`


function check(data) {
    let userData = JSON.parse(localStorage.getItem('userData'))
    if(userData) {
        userID = userData._id
    }
    isOwner = userID == data._ownerId
console.log(isOwner);
    return (isOwner)
}

async function deleteDetail(id) {
     deleteIdea(id)
     goToDashboard()
}

function goToDashboard() {
    main.replaceChildren(dashBoardSection)
}