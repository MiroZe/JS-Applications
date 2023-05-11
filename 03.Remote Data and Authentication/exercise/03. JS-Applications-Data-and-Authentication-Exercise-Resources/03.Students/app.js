
window.addEventListener('load',listStudents)
const url = 'http://localhost:3030/jsonstore/collections/students'
const inputs = Array.from(document.querySelectorAll('input'));
const submitBtn = document.getElementById('submit').addEventListener('click',createStudents);

const tbody = document.querySelector('#results tbody');
const [firstNameInput,lastNameInput,facultyNInput,gradeInput] = inputs;




async function createStudents(e) {
    e.preventDefault();
    tbody.innerHTML = ''
    let isValidData = true;
    inputs.forEach(el => {
        if(el.value == '') {
            isValidData = false
        }
    })
    if(!isValidData) {
        return;
    }
    const response = await fetch(url,{
        method:"POST",
        headers:{'content-type':'application/json'},
        body: JSON.stringify({firstName : firstNameInput.value,
                            lastName: lastNameInput.value,
                            facultyNumber: facultyNInput.value,
                            grade:gradeInput.value  })
    })
    inputs.forEach(el => el.value = '')
    listStudents()
    
}
async function listStudents(e) {
    
    
    const response = await fetch(url);
    const data = await response.json();
    Object.values(data).forEach( el => {
      const tr = createEl('tr',null,tbody);
      const tdFName = createEl('td',`${el.firstName}`,tr);
      const tdLName = createEl('td',`${el.lastName}`,tr);
      const tdfNumber = createEl('td',`${el.facultyNumber}`,tr);
      const tdGrade = createEl('td',`${el.grade}`,tr);
    })


}

function createEl(type, content, parrent,attribute) {
    const el = document.createElement(type);
    if(content) {
        el.textContent = content;
    }
    if(parrent) {
        parrent.appendChild(el);
    }
    return el;
}
