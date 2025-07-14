import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetails.css"
const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=bf3e2d6eb103a39d7cbf6a4b4e2edab1&language=ru-RU`
                );
                const data = await res.json();
                setMovie(data);
            } catch (error) {
                console.error("Ошибка загрузки фильма:", error);
            }
        };

        fetchMovie();
        fetch('https://api.themoviedb.org/3/genre/tv/list?language=ru')
            .then(res => res.json())
            .then(data => setGenres(data.genres))
            .catch(err => console.error(err));
    }, [id]);
    if (!movie) return <p>Загрузка...</p>;
    const genreNames = movie.genres
        ? movie.genres.map(genre => genre.name).join(', ')
        : movie.genre_ids
            ?.map(id => genres.find(g => g.id === id)?.name)
            .filter(Boolean)
            .join(', ');


    return (
        <main>
        <div className="movie_details_page">
            <div>
                <h1>{movie.title}</h1>
            </div>

              <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
              />
            <div className="movie_details_description">
                <p><strong>Год:</strong> {movie.release_date?.split("-")[0]}</p>
                <p><strong>Рейтинг:</strong> {movie.vote_average}</p>
                <p><strong>Описание:</strong> {movie.overview}</p>
                <p><strong>Жанры:</strong> {genreNames}</p>
            </div>



        </div>
        </main>
    );
};

export default MovieDetails;
