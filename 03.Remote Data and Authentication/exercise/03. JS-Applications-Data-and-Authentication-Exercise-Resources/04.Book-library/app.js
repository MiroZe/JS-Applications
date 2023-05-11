const allBooksBtn = document.getElementById('loadBooks').addEventListener('click', loadAllBooks);
const url = 'http://localhost:3030/jsonstore/collections/books';
const tbody = document.querySelector('tbody');
const submitBtn = document.querySelector('form button');
submitBtn.addEventListener('click', submitBook);
const titleInput = document.querySelector('input[name="title"]');
const authorInput = document.querySelector('input[name="author"]');
const h3Form = document.querySelector('h3')
const form = document.querySelector('form')

const booksData = {}

async function loadAllBooks() {
    tbody.innerHTML = ''
    const response = await fetch(url);
    const data = await response.json();
    Object.entries(data).forEach(x => {
        const tr = createEl('tr', null, tbody, { id: `${x[0]}` });

        const tdTitle = createEl('td', `${x[1].title}`, tr);
        const tdAuthor = createEl('td', `${x[1].author}`, tr);
        const tdBtns = createEl('td', null, tr);
        const editBtn = createEl('button', 'Edit', tdBtns);
        const deleteBtn = createEl('button', 'Delete', tdBtns);
        booksData[x[0]] = { title: x[1].title, author: x[1].author }
        editBtn.addEventListener('click', editBook);
        deleteBtn.addEventListener('click', deleteBook)

    })

}
async function submitBook(e) {
    e.preventDefault();
    if (!titleInput.value || !authorInput.value) {
        return;
    }
    let bodyData = {
        author: authorInput.value,
        title: titleInput.value
    };
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(bodyData)
    })

    titleInput.value = '';
    authorInput.value = '';
    loadAllBooks()
}

function createEl(type, content, parrent, attribute) {
    const el = document.createElement(type);
    if (content) {
        el.textContent = content;
    }
    if (parrent) {
        parrent.appendChild(el);
    }
    if (attribute) {
        Object.assign(el, attribute)
    }
    return el;
}
function editBook(e) {
    h3Form.textContent = 'Edit FORM';
    submitBtn.remove()
    titleInput.value = booksData[e.target.parentElement.parentElement.id].title;
    authorInput.value = booksData[e.target.parentElement.parentElement.id].author;
    let patchUrl = `${url}/${e.target.parentElement.parentElement.id}`
    const saveBtn = createEl('button','Save',form)
    saveBtn.addEventListener('click', editCurrentBook)

    async function editCurrentBook(e) {
        
        e.preventDefault();
        if(!authorInput.value || !titleInput.value) {
            return;
        }
        let editData = {
            author: authorInput.value,
            title: titleInput.value
        };
        const response = await fetch(patchUrl, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editData)
        })
        authorInput.value = '';
        titleInput.value = '';
        loadAllBooks()
    }

}
async function deleteBook(e) {
    let deleteUrl = `${url}/${e.target.parentElement.parentElement.id}`
    const response = await fetch(deleteUrl, { method: 'DELETE' })
    loadAllBooks()
}