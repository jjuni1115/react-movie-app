import {useEffect, useState} from "react";
import Movie from "../components/movie";
import {Button, Row, Spinner} from "react-bootstrap";
import {Pagination} from "react-bootstrap";

function Home() {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [pages, setPages] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const getMovies = async (currPage) => {
        const response = await fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year&limit=10&page=${currPage}`);
        const json = await response.json();
        console.log("call api");
        setMovies(json.data.movies);
        setCurrentPage(json.data.page_number);
        setPages(generatePagination(json.data.movie_count, json.data.limit, json.data.page_number));
        setLoading(false);
    };

    const generatePagination = (totalMovies, limit, activePage) => {
        const totalPages = Math.ceil(totalMovies / limit);
        return Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item
                key={i + 1}
                active={i + 1 === activePage}
                onClick={() => getMovies(i + 1)}
            >
                {i + 1}
            </Pagination.Item>
        ));
    };

    const keywordInput = (e) => {
        setKeyword(e.target.value);
    }

    const movieSearch = async () => {
        console.log(keyword);
        setLoading(current => !current);
        const response = await fetch(`https://yts.mx/api/v2/list_movies.json?query_term=${keyword}`);
        const json = await response.json();
        for(let i=0;i++;i<json.data.movie_count/10+1){
            setPages(current=>[...current,<Pagination.Item key={i} active={i===1}>
                {i+1}
              </Pagination.Item>])
        }
        setMovies(json.data.movies);
        setLoading(current => !current);

    }

    useEffect(() => {
        getMovies(1);
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
                (
                    <><Row xs={1} md={4} className="g-4">{
                            movies.map(movie => <Movie movieData={movie} key={movie.id}/>
                            )}


                    </Row>
                    <div style={{
                             display: "flex",
                             justifyContent: "center",
                             alignItems: "center",
                         }}>
                    <Pagination>{pages}</Pagination>
                    </div>
                    </>)
            }

        </div>
    );
}

export default Home;