
const showMovieSection = document.querySelector('#movie-example');
const url = ' http://localhost:3030/data/movies '


export async function loadMovies() {
    try {
        const response = await fetch(url);
        if(!response.ok) {
            const error = await response.json();
            throw error;
        }
        showMovieSection.innerHTML = ''
        const movieData = await response.json();
        movieData.map(createMovie)
    } catch (error) {
        alert(error.message)
    }
    

    function createMovie(movie) {
        const div = createElement('div',null,showMovieSection,{className:'container'})
        const innerDiv = createElement('div',null,div,{className:'row'});
        innerDiv.classList.add('bg-light');
        innerDiv.classList.add('text-dark');
        const h1 = createElement('h1',`Movie title: ${movie.title}`);
        const imgDiv = createElement('div',null,innerDiv,{className:'col-md-8'})
        const img = createElement('img',null,imgDiv,{className:'img-thumbnail',src:movie.img})
    }

    
}
function createElement(type, content, parrent,attribute) {
    const el = document.createElement(type);

    if(content) {
        el.textContent = content;
    }
    if(parrent) {
        parrent.appendChild(el)
    }
    if(attribute) {
        Object.assign(el, attribute)
    }
    return el;

}