import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Card, Spinner, Container, Row, Col} from "react-bootstrap";

function Detail() {
    const params = useParams();
    const [movieData, setMovieData] = useState(null);

    const getMovieDetail = async () => {
        const response = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${params.id}`);
        const json = await response.json();
        setMovieData(json.data.movie);
    };

    useEffect(() => {
        getMovieDetail();
    }, []);

    return (
        <Container className="mt-5">
            {movieData ? (
                <Card>
                    <Row className="g-0">
                        <Col md={4}>
                            <Card.Img variant="top" src={movieData.large_cover_image} />
                        </Col>
                        <Col md={8}>
                            <Card.Body>
                                <Card.Title>{movieData.title}</Card.Title>
                                <Card.Text>{movieData.description_full}</Card.Text>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            ) : (
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <Spinner animation="border" />
                </div>
            )}
        </Container>
    );
}

export default Detail;