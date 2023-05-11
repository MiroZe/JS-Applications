async function lockedProfile() {
    const mainDiv = document.getElementById('main');
    mainDiv.innerHTML = ''
    let baseUrl = `http://localhost:3030/jsonstore/advanced/profiles`
    let counter = 1
    
    

    const response = await fetch(baseUrl)
    const data = await response.json()
    for ( let key in data) {
        const currentProfile = data[key]
        const div = createEl('div','',mainDiv,{className:"profile"})
        const img = createEl('img','',div,{src: './iconProfile2.png',className:'userIcon'})
        const labelLock = createEl('label','',div)
        labelLock.textContent = 'Lock'
        const lockInput = createEl('input','',div,{type:'radio',checked:true,name:`user${counter}Locked`,value:'lock'})
        const labelUnlock = createEl('label','',div)
        labelUnlock.textContent = 'Unlock'
        const unlockInput = createEl('input','',div,{type:'radio',checked:false,name:`user${counter}Locked`,value:'unlock'})
        const br = document.createElement('br')
        div.appendChild(br)
        const hr = document.createElement('hr')
        div.appendChild(hr)
        const labeluserName = createEl('label','',div)
        labeluserName.textContent = 'Username'
        const userNameInput = createEl('input','',div,{type:'text',readOnly : true,disabled:true,name:`user${counter}Username`})
        userNameInput.value = `${currentProfile.username}`
        const hiddenInfoDiv = createEl('div','',div,{id:`user${counter}HiddenFileds`})
        hiddenInfoDiv.style.display = 'none'
        const hr2 = document.createElement('hr')
        hiddenInfoDiv.appendChild(hr2)
        const emailLabel = createEl('label','',hiddenInfoDiv)
        emailLabel.textContent = 'Email'
        const emailInput = createEl('input','',hiddenInfoDiv,{name:`user${counter}Email`,type:'email',readOnly:true,disabled:true,value:`${currentProfile.email}`})
        const ageLabel = createEl('label','',hiddenInfoDiv)
        ageLabel.textContent = 'Age'
        const ageInput = createEl('input','',hiddenInfoDiv,{name:`user${counter}Age`,type:'email',readOnly:true,disabled:true,value:`${currentProfile.age}`})
        const button = createEl('button','',div)
        button.textContent = 'Show more'
        button.addEventListener('click',showMore)
        function showMore(e) {
            if(unlockInput.checked == true && button.textContent == 'Show more') {
                hiddenInfoDiv.style.display = 'inline'
                button.textContent = 'Hide it'
            } else if(button.textContent == 'Hide it' && unlockInput.checked == true) {
                button.textContent = 'Show more'
                hiddenInfoDiv.style.display = 'none'
            }
        }
       counter++
        
    }



    function createEl(type,content,parent,attribute) {
        const el = document.createElement(type);

        if(content) {
            el.value = content
        }
        if(parent) {
            parent.appendChild(el)
        }
        if(attribute) {
            Object.assign(el,attribute)
        }
        return el
    }

}