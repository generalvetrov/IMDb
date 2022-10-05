const keyAPI = 'a3b568a8d4a540758083ef2215c4f334';
const most_popular_url = `https://api.themoviedb.org/3/movie/popular?api_key=${keyAPI}&language=en-US&page=1`;
const image_base_url = 'https://image.tmdb.org/t/p/w1280'
const search_base_url = `https://api.themoviedb.org/3/search/movie?api_key=${keyAPI}&query=`;


async function getUrls(url) {
    try {
        const responce = await axios.get(url);
        const data = responce.data.results;

        createFilmsCard(data)

        const mostPopular = document.querySelector('#most-popular');
        mostPopular.addEventListener('click', () => {
            clearMainWrapper();
            createFilmsCard(data);
        })

        const topRaiting = document.querySelector('#top-raiting');
        topRaiting.addEventListener('click', () => {
            clearMainWrapper();
            const dataTopRaiting = Object.assign([] , data);
            createFilmsCard(dataTopRaiting.sort((a, b) => b.vote_average - a.vote_average));
        })
    }
    catch(err) {
        console.error(err);
    }
}


                                                                            //create films cards

function createFilmsCard(data) {   
    const filmsWrapper = document.querySelector('.films-wrapper');

    for (item of data) {
        const film = document.createElement('div');
        film.className = 'film';
        
        const img = document.createElement('img');
        img.setAttribute('src', `${image_base_url}${item.poster_path}`);
        img.setAttribute('alt', 'image');
        
        const filmRating = document.createElement('div');     //button here
        filmRating.innerHTML = `<img class="star-for-rating" src="https://www.clipartmax.com/png/full/307-3078264_star-rating-icon-rating-star-single-png.png" alt="star"> ${item.vote_average} <button class="star-button">&#9734</button>`;
        
        const filmName = document.createElement('div');
        filmName.className = 'film-name';
        filmName.innerHTML = item.title;
        
        const filmWatchlistButton = document.createElement('button');
        filmWatchlistButton.className = "film-watchlist-button"
        filmWatchlistButton.innerHTML = `+ Watchlist`;
        
        const filmTrailerButton = document.createElement('button');
        filmTrailerButton.className = "film-trailer-button"
        filmTrailerButton.innerHTML = `<span class="buttons-logo">&#9658</span> Trailer`;

        film.append(img);
        film.append(filmRating);
        film.append(filmName);
        film.append(filmWatchlistButton);
        film.append(filmTrailerButton);

        filmsWrapper.append(film);
    }
    buttonsLogoLighter('.header-button');
    buttonsLogoLighter('.film-trailer-button');
    starButtonOn();
}


                                                                            //do buttons logo lighter when mouseover
function buttonsLogoLighter(buttonClass) {
    const buttons = document.querySelectorAll(buttonClass);
    buttons.forEach(b => {
        const span = b.querySelector('.buttons-logo');
        
        b.addEventListener('mouseover', () => {
            if(span) span.style.color = 'white';
        })

        b.addEventListener('mouseleave', () => {
            if(span) span.style.color = 'rgb(100, 100, 100)';
        })
    })
}

function starButtonOn() {                //do star button white
    const starButton = document.querySelectorAll('.star-button');
    starButton.forEach(i => {
        i.addEventListener('click', () => i.style.color = 'white');
    });
}



                                                                            //search
async function getSearch(url) {
    try {
        const responce = await axios.get(`${search_base_url}${url}`);
        const data = responce.data.results;
        createSearchDiv(data);
    }
    catch(err) {
        console.error(err);
    }
}

function createSearch() {
    const input = document.querySelector('#search-imdb');
    const searchResult = document.querySelector('.search-result');
    searchResult.style.display = 'none';

    input.addEventListener('input', (e) => {
        if (e.target.value == '') {
            searchResult.style.display = 'none';
        } else {
            getSearch(e.target.value);
            searchResult.style.display = '';
        }
    })
}

function createSearchDiv(data) {
    clearSearchDiv();
    const searchResult = document.querySelector('.search-result');

    for (item of data) {
        console.log(item)

        const filmSearch = document.createElement('div');
        filmSearch.className = 'film-search';
        const img = document.createElement('img');
        img.setAttribute('src', `${image_base_url}${item.poster_path}`);
        img.setAttribute('alt', 'image');
        img.className = 'film-img-search';
        const nameDescription = document.createElement('div');
        const description = document.createElement('div');
        description.className = 'description';
        description.innerHTML = item.overview;
        const title = document.createElement('div');
        title.innerHTML = item.original_title;
        title.className = 'title-description';

        filmSearch.append(img);

        nameDescription.append(title);
        nameDescription.append(description);
        filmSearch.append(nameDescription);

        searchResult.append(filmSearch);

        filmSearch.addEventListener('mouseover', () => {
            filmSearch.style.backgroundColor = 'rgb(50, 50, 50)';
        })
        
        filmSearch.addEventListener('mouseout', () => {
            filmSearch.style.backgroundColor = 'rgb(30, 30, 30)';
        })
    }
}

function clearSearchDiv() {
    const searchResult = document.querySelector('.search-result');
    const filmSearch = document.querySelectorAll('.film-search');

    filmSearch.forEach(i => {
        searchResult.removeChild(i);
    });
}

function clearSearchDivIfClick() {
    const body = document.querySelector('body');

    body.addEventListener('click', () => {
        const searchResult = document.querySelector('.search-result');
        const input = document.querySelector('#search-imdb');
        input.value = '';
        clearSearchDiv();
        searchResult.style.display = 'none';    
    })
}



                                                                            //sorted by main buttons
function clearMainWrapper() {
    const filmsWrapper = document.querySelector('.films-wrapper');
    const films = document.querySelectorAll('.film');

    films.forEach(element => {
        filmsWrapper.removeChild(element);
    });
}


getUrls(most_popular_url);
createSearch();
clearSearchDivIfClick();


