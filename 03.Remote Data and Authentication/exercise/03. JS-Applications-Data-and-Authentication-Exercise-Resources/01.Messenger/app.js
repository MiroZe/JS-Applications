function attachEvents() {
    const url = 'http://localhost:3030/jsonstore/messenger'

    const textarea = document.getElementById('messages');
    const nameInput =  document.querySelector('input[name="author"]');
    
    const messageInput =  document.querySelector('input[name="content"]');
    const sendBtn = document.getElementById('submit');
    const refreshBtn = document.getElementById('refresh');

    sendBtn.addEventListener('click',sendMessage)
    async function sendMessage() {
        if(nameInput.value == '' || messageInput.value == '') {
            return
        }
        const response = await fetch(url,{
            method : "POST",
            headers :{'content-type' : 'application/json'},
            body: JSON.stringify({
                author: nameInput.value,
                content: messageInput.value,
            }
            )
        })
        nameInput.value = '';
        messageInput.value = '';
    }
    refreshBtn.addEventListener('click',showMessages);
    async function showMessages () {
        textarea.value = ''
        const response = await fetch(url);
        const data = await response.json();
        const output = []
        Object.values(data).forEach( x => {
            const {author,content} = x;
            output.push(`${author}: ${content}`)
           
            textarea.value = output.join('\n')

        });
    }
    
}

attachEvents();