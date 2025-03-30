import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap"
import axios from 'axios';
import './style.css';

// Fonction pour récupérer le cookie CSRF
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
    const [password2, setPassword2] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Pour afficher les erreurs

    const [passShow1, setPassShow1] = useState(false);
    const showPass1 = () => setPassShow1(true);
    const hidePass1 = () => setPassShow1(false);

    const [passShow2, setPassShow2] = useState(false);
    const showPass2 = () => setPassShow2(true);
    const hidePass2 = () => setPassShow2(false);

	const [show, setShow] = useState(false)
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	const error = [ "",
				"Passwords are not similar.",
				"Username is already taken.",
				"Password is not strong enough.\nPassword must contain at least 8 characters.",
				"Password is not strong enough.\nPassword must contain at least one number.",
				"Password is not strong enough.\nPassword must contain at least one lowercase letter.",
				"Password is not strong enough.\nPassword must contain at least one capital letter.",
				"Password is not strong enough.\nPassword must contain at least one special character (!@#$%^&*...).",
				"Username required.",
				"Password required.",
				"Second password required."]

	const [errorId, setErrorId] = useState(0)

    // Configure Axios pour inclure les cookies (nécessaire pour CSRF)
    useEffect(() => {
        axios.defaults.withCredentials = true; // Permet d’envoyer/recevoir les cookies
    }, []);

    const sendAuth = async (e) => {
        e.preventDefault();
        const csrfToken = getCookie('csrftoken'); // Récupère le jeton CSRF du cookie

        try {
            const response = await axios.post(
                'https://transcendence.fr/users/api/register/',
                {
                    username: username,
                    password: password,
                    password2: password2
                },
                {
                    headers: {
                        'X-CSRFToken': csrfToken // Ajoute le jeton CSRF dans l’en-tête
                    }
                }
            );
			if (response.request.response == "{\"code\":1000}") {
				navigate("/")
			}
        } catch (error) {
			//console.log(error)
			setUsername("")
			setPassword("")
			setPassword2("")
			if (error.response.request.response == "{\"code\":1001}")
				setErrorId(1);
			else if (error.response.request.response == "{\"code\":1002}")
				setErrorId(2);
			else if (error.response.request.response == "{\"code\":1003}")
				setErrorId(3);
			else if (error.response.request.response == "{\"code\":1004}")
				setErrorId(4);
			else if (error.response.request.response == "{\"code\":1005}")
				setErrorId(5);
			else if (error.response.request.response == "{\"code\":1006}")
				setErrorId(6);
			else if (error.response.request.response == "{\"code\":1007}")
				setErrorId(7);
			else if (error.response.request.response == "{\"code\":1009}")
				setErrorId(8);
			else if (error.response.request.response == "{\"code\":1010}")
				setErrorId(9);
			else if (error.response.request.response == "{\"code\":1011}")
				setErrorId(10);
			else if (errorData.detail)
				setErrorMessage(errorData.detail) // Affiche l’erreur CSRF si elle persiste
			else
				setErrorId(0);
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
                        type={passShow1 ? "text" : "password"}
                        value={password}
                        placeholder="Insert password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="rounded-0"
						name="password"
						id="password"
						autocomplete="new-password"
                    />
                    <Button
                        type="button"
                        className="rounded-0 btn btn-light"
						aria-label="show"
                        onClick={passShow1 ? hidePass1 : showPass1}>
                        {passShow1 ? <i className="bi bi-eye-fill"></i>
                                   : <i className="bi bi-eye-slash-fill"></i>}
                    </Button>
                </div>
                <div className="d-flex">
                    <Form.Control
                        type={passShow2 ? "text" : "password"}
                        value={password2}
                        placeholder="Confirm password"
                        onChange={(e) => setPassword2(e.target.value)}
                        className="rounded-0"
						name="confirm password"
						autocomplete="new-password"
                    />
                    <Button
                        type="button"
                        className="rounded-0 btn btn-light"
						aria-label="show"
                        onClick={passShow2 ? hidePass2 : showPass2}>
                        {passShow2 ? <i className="bi bi-eye-fill"></i>
                                   : <i className="bi bi-eye-slash-fill"></i>}
                    </Button>
                </div>
            </Form.Group>
			<div class="d-flex justify-content-center pt-3 mb-3 mb-lg-5">
				<Button
					type="submit"
					className="btn btn-secondary rounded-0 fw-bolder"
					onClick={sendAuth}
				>
					REGISTER
				</Button>
			</div>
			<div class="d-flex justify-content-end pt-3">
				<Button
					type="button"
					className="btn btn-secondary rounded-0 fw-bolder"
					onClick={() => navigate("/")}
				>
					LOGIN
				</Button>
			</div>
			<Modal show={show} onHide={handleClose} className="login-modal">
				<Modal.Header closeButton>
					<Modal.Title>Registration error</Modal.Title>
				</Modal.Header>
				<Modal.Body>{error[errorId]}</Modal.Body>
			</Modal>
        </Form>
    );
}

export default UserPass;
