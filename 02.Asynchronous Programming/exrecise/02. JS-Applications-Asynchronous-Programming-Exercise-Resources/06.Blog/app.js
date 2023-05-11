function attachEvents() {

    const postsUrl = `http://localhost:3030/jsonstore/blog/posts`;
   
    const btnLoadPosts = document.getElementById('btnLoadPosts');
    const selectOptions = document.getElementById('posts')
    const viewBtn = document.getElementById('btnViewPost')
    const postCommentsUl = document.getElementById('post-comments')
    const h1Post = document.getElementById('post-title')
    const pBody = document.getElementById('post-body')
    const bodyVal = {}

    btnLoadPosts.addEventListener('click', load);
    async function load(e) {
        selectOptions.innerHTML = ''
        const response = await fetch(postsUrl);
        const data = await response.json();
        console.log(data);
        Object.entries(data).forEach(element => {
            const body = element[1].body;
            const h1Content = element[1].title;
            bodyVal[element[1].id] = {body:body,h1Content:h1Content}
            
            const option = document.createElement('option')
            option.value = element[0]
            option.text = element[1].title
            selectOptions.appendChild(option)
        })
      
        
        viewBtn.addEventListener('click', view)
        async function view(e) {
            
            postCommentsUl.innerHTML = ''
            const postsId = selectOptions.value
            
            const commentsUrl = `http://localhost:3030/jsonstore/blog/comments/`
            const responseC = await fetch(commentsUrl)
            const dataC = await responseC.json()
            
            h1Post.textContent = bodyVal[postsId].h1Content
            pBody.textContent = bodyVal[postsId].body
            Object.values(dataC)
                .forEach(el => {

                    if (el.postId == postsId) {
                        
                        const li = document.createElement('li');
                        li.id = el.id
                        li.textContent = el.text;
                        postCommentsUl.appendChild(li)


                    }
                })
                
        }
    }
}

attachEvents();