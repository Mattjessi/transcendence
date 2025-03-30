import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
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

	const [show, setShow] = useState(false)
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	const error = [ "",
			"Username required.",
			"Password required.",
			"Username or Password incorrect."]

	const [errorId, setErrorId] = useState(0)

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
			console.log(response)
			if (response.request.response.includes("\"code\":1000")) {
				if (response.data.tokens) {
					localStorage.setItem('jwt', response.data.tokens)
					if (localStorage.getItem("jwt"))
						navigate("/home")
				}
			}
        } catch (error) {
			//console.log(error)
			setUsername("")
			setPassword("")
			if (error.response.request.response == "{\"code\":1009}")
				setErrorId(1)
			else if (error.response.request.response == "{\"code\":1010}")
				setErrorId(2)
			else if (error.response.request.response == "{\"code\":1013}")
				setErrorId(3)
			else if (errorData.detail && errorData.detail.includes("CSRF"))
				setErrorMessage("Erreur CSRF : jeton manquant ou invalide.")
			else
				setErrorId(0)
				handleShow()
        }
    };

    return (
        <Form>
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
					className="btn btn-secondary rounded-0 fw-bolder"
					onClick={sendAuth}
				>
					LOGIN
				</Button>
			</div>
			<div class="d-flex justify-content-end pt-3">
				<Button
					type="button"
					className="btn btn-secondary rounded-0 fw-bolder"
					onClick={() => navigate("/register")}
				>
					REGISTER
				</Button>
			</div>
			<Modal show={show} onHide={handleClose} className="">
				<Modal.Header closeButton>
					<Modal.Title>Connection error</Modal.Title>
				</Modal.Header>
				<Modal.Body>{error[errorId]}</Modal.Body>
			</Modal>
        </Form>
    );
}

export default UserPass;
