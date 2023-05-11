 async function solution() {
     const mainSection = document.getElementById('main')
    
   
    const baseUrl = 'http://localhost:3030/jsonstore/advanced/articles/list'

    const response = await fetch (baseUrl);
    
    const data = await response.json()
    
    data.forEach(element => {
        
        const div = createEl('div','',mainSection,{className:'accordion'})
        const divHead = createEl('div','',div,{className:'head'})
        const span = createEl('span',`${element.title}`,divHead)
        const button = createEl('button','More',divHead,{className:'button',id:element._id})
        button.addEventListener('click',load)
        const divExtra = createEl('div','',div,{className:'extra'})
        async function load(e) {
    
            const response = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${e.target.id}`)
            const data = await response.json()
            if(e.target.textContent == 'More') {
                const p = createEl('p',`${data.content}`,divExtra)
                divExtra.style.display = 'inline'
                e.target.textContent = 'Less'
    
            } else if(e.target.textContent == 'Less') {
                    e.target.textContent = 'More'
                    divExtra.innerHTML = ''
                    divExtra.style.display = 'none'
                }
    
        }
    });

    function createEl(type,content,parent,attribute) {
        const el = document.createElement(type);

        if(content) {
            el.textContent = content
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
solution()



