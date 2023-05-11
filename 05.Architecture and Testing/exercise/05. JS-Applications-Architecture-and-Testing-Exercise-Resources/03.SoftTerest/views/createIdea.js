import { postIdea } from '../data/data.js';
import {showSection} from '../src/router.js'


const createSection = document.getElementById('create');

const createForm = document.getElementById('create-form')
createForm.addEventListener('submit',getIdea)

let context = null;

export function showCreate(ctx) {
    context = ctx
    ctx.showTargetSection(createSection)
}


function getIdea(e) {
    const formaData = new FormData(createForm)

    const {title,description,imageURL} = Object.fromEntries(formaData.entries())

    try {
        if(!title || !description || !imageURL) {
            throw new Error(' All fields are mandatory')
        }
        if(title.length < 6 ) {
            throw new Error('Title should be minimum 6 characters symbols')
        }
        if(description.length < 10 ) {
            throw new Error('Description should be minimum 10 characters symbols')
        }
        if(imageURL.length < 5 ) {
            throw new Error('imageURL should be minimum 5 characters symbols')
        }

        postIdea(title,description,imageURL)
        createForm.reset()
        context.goTo('/Dashboard')

    } catch (error) {
        alert (error.message)
    }



}

