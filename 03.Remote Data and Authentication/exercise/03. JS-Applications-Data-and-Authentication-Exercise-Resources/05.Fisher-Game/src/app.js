const welcomeSpan = document.querySelector('.email span');
const allCatches = document.getElementById('catches')
const fieldset = document.getElementById('main');
fieldset.style.display = 'none';
const addBtn = document.querySelector('.add');

if(localStorage.email != null) {
    fieldset.style.display = 'none'
    welcomeSpan.textContent = localStorage.getItem('email');
    document.getElementById('login').style.display = 'none';
    document.getElementById('register').style.display = 'none';
    addBtn.disabled = false;
    
} else  {
    document.getElementById('logout').style.display = 'none';
    const buttons = Array.from(document.querySelectorAll('.delete, .update'));
    buttons.forEach( b => b.disabled = true)
    fieldset.style.display = 'none';

}
const logout = document.getElementById('logout').addEventListener('click',async ()=> {
    const token = localStorage.getItem('token')
    const response = await fetch('http://localhost:3030/users/logout',{
        method:"GET",
        headers: {'X-Authorization':token}
    })
    
    document.getElementById('login').style.display = 'inline';
    document.getElementById('register').style.display = 'inline';
    document.getElementById('logout').style.display = 'none';
    welcomeSpan.textContent = 'guest';
   
    localStorage.clear();
    location = './index.html';

});

const loadCatchesURl = 'http://localhost:3030/data/catches';
const loadBtn = document.querySelector('.load');
loadBtn.addEventListener('click', loadAll);
async function loadAll() {
    if(!localStorage.email) {
        return
    }
    fieldset.style.display = 'inline';
    allCatches.innerHTML = '';
  try {
 const response = await fetch(loadCatchesURl);
 if( !response.ok) {
    const error = response.json();
    throw error;
 }
  const data = await response.json();
  data.forEach(unit => {
      let isUserLogIn = unit._ownerId == localStorage.id;
      console.log(isUserLogIn);
      const div = createEl('div',null,{className:'catch'},allCatches);
      const labelAnler = createEl('label','Angler',null,div)
      const inputAngler = createEl('input','',{type:'text',className:'angler',value:unit.angler},div)
      const labelWeight = createEl('label','Weight',null,div)
      const inputWeight = createEl('input','',{type:'text',className:'weight',value:unit.weight},div)
      const labelSpecies = createEl('label','Species',null,div)
      const inputSpecies = createEl('input','',{type:'text',className:'species',value:unit.species},div)
      const labelLocation = createEl('label','Location',null,div)
      const inputLocation = createEl('input','',{type:'text',className:'species',value:unit.location},div)
      const labelBait = createEl('label','Bait',null,div)
      const inputBait = createEl('input','',{type:'text',className:'bait',value:unit.bait},div)
      const labelCaptureTime = createEl('label','Capture Time',null,div)
      const inputCaptureTime = createEl('input','',{type:'number',className:'captureTime',value:unit.captureTime},div)
      const updateButton = createEl('button','Update',{className:'update','data-id':unit._ownerId,disabled:!isUserLogIn},div)
      const dleteButton = createEl('button','Delete',{className:'delete','data-id':unit._ownerId,disabled:!isUserLogIn},div)

  })
    
  } catch (error) {
    alert(error.message)
}
}

const addForm = document.getElementById('addForm');
addForm.addEventListener('submit',addCatch) 
async function addCatch(e) {
    e.preventDefault();
    const catchData = new FormData(e.currentTarget);
    const {angler,weight,species,location,bait,captureTime} = Object.fromEntries([...catchData.entries()])
    try {
        const token = localStorage.getItem('token');
        
       if(typeof angler != 'string' || typeof species !== 'string' || typeof bait !== 'string' || typeof location !== 'string' || typeof Number(weight) !== 'number' || typeof Number(captureTime) !== 'number' ) {
        throw new Error('Please submit correct data!')
       }
       if(!angler || !species || !bait || !location || !weight || !captureTime) {
        throw new Error('All fields ara mandatory')
       }
       
       const options = {method: 'POST',
                        headers:{'content-type':'application/json','X-Authorization':token},
                        body: JSON.stringify({angler:angler,weight:weight,species:species,location:location,bait:bait,captureTime:captureTime})}
       const response = await fetch(`http://localhost:3030/data/catches`,options );
       if(!response.ok) {
        const error = await response.json();
        throw error;
       }
       
    } catch (error) {
        alert (error.message)
        addForm.reset();
    }

}


function createEl (type,content,attribute,parent){
    const el = document.createElement(type);
    if(content) {
        el.textContent = content
    }
    if(attribute) {
        Object.assign(el,attribute)
    }
    if(parent) {
        parent.appendChild(el)
    }
    return el
}