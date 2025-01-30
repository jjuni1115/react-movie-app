import {useEffect, useState} from "react";
import Movie from "../components/movie";
import {Button, Row, Spinner} from "react-bootstrap";

function Home() {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [keyword, setKeyword] = useState("");

    const getMovies = async () => {
        const response = await fetch("https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year");
        const json = await response.json();
        console.log("call api");
        setMovies(json.data.movies);
        setLoading(current => !current);
    }

    const keywordInput = (e) => {
        setKeyword(e.target.value);
    }

    const movieSearch = async () => {
        console.log(keyword);
        setLoading(current => !current);
        const response = await fetch(`https://yts.mx/api/v2/list_movies.json?query_term=${keyword}`);
        const json = await response.json();
        setMovies(json.data.movies);
        setLoading(current => !current);

    }

    useEffect(() => {
        getMovies();
    }, []);

    return (
        <div>
            <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
            <h1>Movie App</h1>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    padding: "20px",
                }}
            >
                <input type="text" value={keyword} onInput={keywordInput}/>
                <Button onClick={movieSearch}>search</Button>
            </div>

            {loading ?

                <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">

                    <Spinner animation="border"/>

                </div>
                :
                <Row xs={1} md={4} className="g-4">{
                    movies.map(movie => <Movie movieData={movie} key={movie.id}/>
                    )}


                </Row>

            }

        </div>
    );
}

export default Home;