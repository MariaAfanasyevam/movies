import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MovieCard.css";
import Star from "../../assets/star.png";

const MovieCard = ({ movie }) => {
    const [genres, setGenres] = useState([]);
    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjNlMmQ2ZWIxMDNhMzlkN2NiZjZhNGI0ZTJlZGFiMSIsIm5iZiI6MTc1MjQyOTI0MC4wODE5OTk4LCJzdWIiOiI2ODczZjJiODUxMWQ1ODllNGU3MDU3YmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.HatUlzlSiAR6NIAVasfBk3mk4pRFKB8PIsvZOnhW8YI'
            }
        };

        fetch('https://api.themoviedb.org/3/genre/tv/list?language=ru', options)
            .then(res => res.json())
            .then(data => setGenres(data.genres))
            .catch(err => console.error(err));
    },[]);
    const genreNames = movie.genre_ids
        .map(id =>genres.find(genre => genre.id === id))
        .filter(Boolean)
        .map(genre => genre.name)
        .join(', ');
    return (
        <Link to={`/movie/${movie.id}`} className='movie_card'>
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt='movie poster'
                className='movie_poster'
            />

            <div className='movie_details'>
                <h3 className='movie_details_heading'>
                    {movie.original_title}
                </h3>
                <div className='align_center movie_date_rate'>
                    <p>{movie.release_date}</p>
                    <p className='align_center'>
                        {movie.vote_average}
                        <img
                            src={Star}
                            alt='rating icon'
                            className='card_emoji'
                        />
                    </p>
                </div>
                <p className='movie_description'>
                    {movie.overview.slice(0, 50) + "..."}
                </p>
                <div>
                    <p className="genre_name">{genreNames}</p>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;