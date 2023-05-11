function attachEvents() {
   const [personInput,phoneInput] = Array.from(document.querySelectorAll('input'));
   const [loadBtn,createBtn] = Array.from(document.querySelectorAll('button'));
   loadBtn.addEventListener('click',loadContacts);
   const ul = document.getElementById('phonebook')
    const url = 'http://localhost:3030/jsonstore/phonebook';
    

   async function loadContacts() {
    ul.innerHTML = ''
    const response = await fetch(url);
    const data = await response.json();
    Object.values(data).forEach(el => {
        const li = document.createElement('li');
        li.textContent = `${el.person}: ${el.phone}`; 
        li.id = el._id;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        li.appendChild(deleteBtn);
        deleteBtn.addEventListener('click',deleteContact);


        ul.appendChild(li)
    })
   }
   createBtn.addEventListener('click', addContact);
   async function addContact() {
    if(!personInput.value || !phoneInput.value) {
        return;
    }
    const response = await fetch(url,{
        method:'POST',
        header:{'content-type':'application/json'},
        body: JSON.stringify({person:personInput.value,phone:phoneInput.value})
    })
    personInput.value = '';
    phoneInput.value = '';
    loadContacts();

   }
   async function deleteContact(e) {
    const targetLi = e.target.parentElement;
    targetLi.remove();
    const response = await fetch(`${url}/${targetLi.id}`,{method:'DELETE'})
    
   }
}

attachEvents();