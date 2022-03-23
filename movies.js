    function getQuery() {
        document.getElementById("movies").innerHTML = ""
        search = document.getElementById("search").value
        getMovies(search, 1)
        
       
       

    }
    function getNext(x) {
        document.getElementById("movies").innerHTML = ""
        search = document.getElementById("search").value
        //  console.log(search)
        const page = x
        //  console.log(page)
        getMovies(search, page)
    }
    async function getMovies(search_word, page) {
        
        urlp = `https://www.omdbapi.com/?s=${search_word}&page=${page}&type=movie&apikey=936e5c90&`

        const response = await fetch(urlp,
            {

                "method": "GET",
                "headers": {
                    "accept": "application/json"
                }
            });

        console.log(response)
        const data = await response.json();
        // console.log(data)
        const movies = data.Search
        //console.log(movies)
        for (i = 0; i < movies.length; i++) {
            const title = movies[i].Title
            const movie_id = movies[i].imdbID
            const poster = movies[i].Poster

            const movie = `<div class="col-sm"> <div class="posters well text-center"><img src="${poster}">
                <h5 class="titles">${title}</h5><a onclick="getSingleMovies('${movie_id}')" class="btn btn-primary" href="#">Movie Details</a> </div></div>`


            document.getElementById("movies").innerHTML += movie
        }

    }


    async function getSingleMovies(id) {

        let movie_id = id
        //console.log(movie_id)
        url1 = `https://www.omdbapi.com/?i=${movie_id}&apikey=936e5c90&`

        const response = await fetch(url1,
            {

                "method": "GET",
                "headers": {
                    "accept": "application/json"
                }
            });

        const data = await response.json();
        //console.log(data)


        document.getElementById("movies").innerHTML = ""
        movieArray = Object.entries(data);
        const titles = Object.values(movieArray[0])
        const title = titles[1]
        const years = Object.values(movieArray[3])
        const year = years[1]
        const posters = Object.values(movieArray[13])
        const poster = posters[1]
        const actors = Object.values(movieArray[8])
        const actor = actors[1]
        const plots = Object.values(movieArray[9])
        const plot = plots[1]
        const genres = Object.values(movieArray[5])
        const genre = genres[1]
        const languages = Object.values(movieArray[10])
        const language = languages[1]
        const ratings = Object.values(movieArray[16])
        const rating = ratings[1]
       
        
       
        const movie = `<div class="row"><div class="col-md-4">
        <img class="poster" src="${poster}" ></div>
        <div class = "col-md-8" id="details">
        <h2>${title}</h2>
        <ul >
        <li class="group"><h4>Released: ${year}</h4></li>
        <li class="group"><h4>Actors: ${actor}</h4></li>
        <li class="group"><h4>Genre: ${genre}</h4></li>
        <li class="group"><h4>Language: ${language}</h4></li>
        <li class="group"><h4>IMDB Rating: ${rating}</h4></li></ul><br>
        <a href="http://imdb.com/title/${movie_id}" target="_blank" class="btn btn-primary" style="width:150px">View IMDB</a>
        </div></div>
        <div id="plot"><h5>Plot: ${plot}</h5></div>
       `


        document.getElementById("movies").innerHTML += movie


    }


