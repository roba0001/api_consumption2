import { API_KEY } from "./info.js";
import { API_BASE_URL } from "./info.js";

const baseImgUrl = 'https://image.tmdb.org/t/p/w200'

fetchMovies('/now_playing');
document.querySelector('#now_playing').classList.add('selected');


document.querySelectorAll('nav button').forEach((menuOption) => {
    menuOption.addEventListener('click', (e) => {
    const endpoint = e.target.id;
    console.log(endpoint);

   fetchMovies(endpoint);

    document.querySelector('nav button.selected')?.classList.remove('selected');
    e.target.classList.add('selected');


})
});


function fetchMovies(endpoint){
    fetch(`${API_BASE_URL}/${endpoint}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${API_KEY}`
        }
    }).then(response=>response.json())
    .then(data => {
        const movies = data.results;
        // console.log("movies", movies);

        let movieList = document.querySelector('#movie_list');
        movieList.innerHTML = '';
    
        const allMovies = document.createDocumentFragment();
    
        movies.forEach((movie) => {
            const movieCard = document.querySelector('#movie_card').content.cloneNode(true);
            movieCard.querySelector('h2').innerText = movie.title;
            movieCard.querySelector('img').src = `${baseImgUrl}/${movie.poster_path}`;
            movieCard.querySelector('#card_info').innerText = movie.overview;
            movieCard.querySelector('#card_title').innerText = movie.original_title;
            movieCard.querySelector('#card_date').innerText = movie.release_date;
    
            allMovies.append(movieCard);
        });
    
        document.querySelector('#movie_list').append(allMovies)
    });
};

