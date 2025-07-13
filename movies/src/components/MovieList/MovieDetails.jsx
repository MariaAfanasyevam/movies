import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

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
    }, [id]);

    if (!movie) return <p>Загрузка...</p>;

    return (
        <main>
        <div className="movie_details_page">
            <h1>{movie.title}</h1>
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />
            <p><strong>Год:</strong> {movie.release_date?.split("-")[0]}</p>
            <p><strong>Рейтинг:</strong> {movie.vote_average}</p>
            <p><strong>Описание:</strong> {movie.overview}</p>
        </div>
        </main>
    );
};

export default MovieDetails;
