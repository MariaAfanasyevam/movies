import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import MovieList from './components/MovieList/MovieList';
import MovieDetails from './components/MovieList/MovieDetails';
import Fire from './assets/fire.png';
import Star from './assets/glowing-star.png';

function App() {
    return (
        <Router>
            <div className="app">
                <Navbar />
                <Routes>
                    <Route
                        path="/movies"
                        element={
                            <>
                                <MovieList type="popular" title="Popular" emoji={Fire} />
                                <MovieList type="top_rated" title="Top Rated" emoji={Star} />
                            </>
                        }
                    />
                    <Route path="/movie/:id" element={<MovieDetails />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
