import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from 'axios';
import './style.css';

// Fonction pour récupérer un cookie
const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};

function UserPass() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [csrfToken, setCsrfToken] = useState(null);

    const [passShow, setPassShow] = useState(false);
    const showPass = () => setPassShow(true);
    const hidePass = () => setPassShow(false);

    // Récupère le jeton CSRF au chargement
    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                axios.defaults.withCredentials = true;

                // Essaie d’abord la racine
                let response = await axios.get('https://transcendence.fr/', { withCredentials: true });
                let token = getCookie('csrftoken');
                
                if (!token) {
                    console.log('Pas de CSRF à la racine, tentative avec /users/lobby-chat/');
                    // Si la racine échoue, essaie une URL Django spécifique
                    response = await axios.get('https://transcendence.fr/users/lobby-chat/', { withCredentials: true });
                    token = getCookie('csrftoken');
                }

                if (token) {
                    setCsrfToken(token);
                    console.log('Jeton CSRF récupéré :', token);
                } else {
                    console.error('Cookie CSRF non trouvé après les tentatives');
                    setErrorMessage('Impossible de récupérer le jeton CSRF.');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération du CSRF :', error);
                if (error.response && error.response.status === 404) {
                    setErrorMessage('URL CSRF introuvable (404). Vérifiez la configuration serveur.');
                } else {
                    setErrorMessage('Erreur de connexion au serveur pour CSRF.');
                }
            }
        };
        fetchCsrfToken();
    }, []);

    const sendAuth = async (e) => {
        e.preventDefault();

        if (!csrfToken) {
            setErrorMessage("Jeton CSRF manquant. Rechargez la page.");
            return;
        }

        try {
            const response = await axios.post(
                'https://transcendence.fr/users/api/login/',
                {
                    username: username,
                    password: password
                },
                {
                    headers: {
                        'X-CSRFToken': csrfToken,
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
            console.log("Connexion réussie :", response.data);
            if (response.status === 200) {
                if (response.data.tokens) {
                    localStorage.setItem('jwt', JSON.stringify(response.data.tokens));
                    if (localStorage.getItem('jwt')) {
                        navigate('/home');
                    }
                } else {
                    setErrorMessage('Réponse inattendue du serveur (tokens manquants).');
                }
            }
        } catch (error) {
            console.log("Erreur complète :", error);
            if (error.response) {
                const errorData = error.response.data;
                if (errorData.error) {
                    setErrorMessage(errorData.error);
                } else if (errorData.detail && errorData.detail.includes("CSRF")) {
                    setErrorMessage("Erreur CSRF : jeton manquant ou invalide.");
                } else {
                    setErrorMessage("Erreur lors de la connexion.");
                }
            } else {
                setErrorMessage("Erreur de connexion au serveur.");
            }
            setUsername("");
            setPassword("");
        }
    };

    return (
        <Form onSubmit={sendAuth}>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <Form.Group className="fs-5 fs-lg-4 mb-2 mb-lg-4">
                <Form.Label className="mb-0" for="username">Username</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    placeholder="Insert username"
                    onChange={(e) => setUsername(e.target.value)}
                    className="rounded-0"
					name="username"
					id="username"
					autocomplete="username"
                />
            </Form.Group>
            <Form.Group className="fs-5 fs-lg-4 mb-2 mb-lg-4">
                <Form.Label className="mb-0" for="password">Password</Form.Label>
                <div className="d-flex">
                    <Form.Control
                        type={passShow ? "text" : "password"}
                        value={password}
                        placeholder="Insert password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="rounded-0"
						name="password"
						id="password"
						autocomplete="current-password"
                    />
                    <Button
                        type="button"
                        className="rounded-0 btn btn-light"
						aria-label="show"
                        onClick={passShow ? hidePass : showPass}
                    >
                        {passShow ? <i className="eye bi-eye-fill"></i>
                                  : <i className="eye bi-eye-slash-fill"></i>}
                    </Button>
                </div>
            </Form.Group>
			<div class="d-flex justify-content-center pt-3 mb-3 mb-lg-5">
				<Button
					type="submit"
					className="btn btn-secondary rounded-0"
				>
					LOGIN
				</Button>
			</div>
			<div class="d-flex justify-content-end pt-3">
				<Button
					type="button"
					className="btn btn-secondary rounded-0"
					onClick={() => navigate("/register")}
				>
					REGISTER
				</Button>
			</div>
        </Form>
    );
}

export default UserPass;
