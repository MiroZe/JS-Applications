function loadCommits() {
    const userName = document.getElementById('username').value
    const repo = document.getElementById('repo').value
    const ul = document.getElementById('commits')

    let baseUrl = `https://api.github.com/repos/${userName}/${repo}/commits`


    fetch(baseUrl)
    .then(handleResponse)
    .then(displayCom)
    .catch(handleError)

    function handleResponse (response) {
        let data = response.json()
        console.log(data);
        return data

    }
 
    function displayCom(data) {
        for (let {commit} of data) {
            const li = document.createElement('li')
            li.textContent = `${commit.author.name}: ${commit.message}`
            ul.appendChild(li)
        };
    }
    function handleError(error) {
        ul.innerHTML = `${error.message}`
    }

}