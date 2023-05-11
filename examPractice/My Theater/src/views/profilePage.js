import {html} from '../../node_modules/lit-html/lit-html.js'
import { showMyEvents } from '../data/services.js'
import { getUserData } from '../util.js'




const profileTemplate = (myEvents,user) => html`<section id="profilePage">
<div class="userInfo">
    <div class="avatar">
        <img src="./images/profilePic.png">
    </div>
    <h2>${user.email}</h2>
</div>
<div class="board">
   
    ${myEvents.length > 0 ? myEvents.map(oneItem) : html `<div class="no-events">
        <p>This user has no events yet!</p>
    </div>`}
   

  
    
</div>
</section>`


const oneItem = (item) => html `<div class="eventBoard">
<div class="event-info">
    <img src=${item.imageUrl}>
    <h2>${item.title}</h2>
    <h6>${item.date}</h6>
    <a href=/details/${item._id} class="details-button">Details</a>
</div>
</div>
`

export async function showProfilePage(ctx) {

const user = getUserData()
const userId = user._id
const myEvents = await showMyEvents(userId)


ctx.render(profileTemplate(myEvents,user))

}
