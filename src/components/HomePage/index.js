import React, { useState, useEffect } from 'react';
import { Container, Table, Col, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './index.css';

const Homepage = ({ username, onLogout }) => {
    const [jokes, setJokes] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const fetchJokes = async () => {
            try {
                const response = await fetch(
                    'https://v2.jokeapi.dev/joke/any?format=json&blacklistFlags=nsfw,sexist&type=single&lang=EN&amount=10'
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch jokes');
                }
                const data = await response.json();
                setJokes(data.jokes.map((joke) => joke.joke));
            } catch (error) {
                console.error('Error fetching jokes:', error);
            }
        };

        fetchJokes();
    }, []);

    const handleLogout = () => {
        onLogout();
        history.push('/');
    };

    return (
        <Container fluid className="homepage-container">
            <Col xs={12}>
                <div className="d-flex justify-content-between align-items-center">
                    <h2 className="mt-5">Welcome, {username}!</h2>
                </div>
                <h3 className="mb-3">Jokes</h3>
                <Table striped bordered hover className="jokes-table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Jokes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jokes.map((joke, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{joke}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Button variant="danger" onClick={handleLogout}>
                    Logout
                </Button>
            </Col>
        </Container>
    );
};

export default Homepage;
