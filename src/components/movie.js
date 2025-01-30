import {Card, Col} from "react-bootstrap";
import {Link} from "react-router-dom";

function Movie({movieData}) {
    return (
        <Col key={movieData.id} className="mb-4">
            <Card className="h-100 shadow-sm">
                <Card.Img variant="top" src={movieData.medium_cover_image} />
                <Card.Body>
                    <Card.Title>
                        <Link to={`/movie/${movieData.id}`} className="text-decoration-none text-dark">
                            {movieData.title}
                        </Link>
                    </Card.Title>
{/*                    <Card.Text>
                        {movieData.summary}
                    </Card.Text>*/}
                </Card.Body>
                <Card.Footer>
                    <ul className="list-inline">
                        {movieData.genres.map(genre => (
                            <li key={genre} className="list-inline-item">
                                <span className="badge bg-secondary">{genre}</span>
                            </li>
                        ))}
                    </ul>
                </Card.Footer>
            </Card>
        </Col>
    );
}

export default Movie;