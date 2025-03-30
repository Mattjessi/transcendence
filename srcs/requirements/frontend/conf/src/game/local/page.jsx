import React, { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap"
import Gameplay from "../../gameplay/settings/page"
import ResizeScreen from "../../global/resize-screen.jsx"
import ResizeModal from "../../global/resize-modal.jsx"
import Settings from './settings/page'
import Skin from './skin/page'
import './style.css'

function Local() {

	const navigate = useNavigate()

	const canva = useRef(null)

	const { resize } = ResizeScreen()

	const goPlay = () => {
		//envoie des donnés
		navigate("/local/game")
	}

	const [n, setN] = useState(0)
	const [color, setColor] = useState(0)

	const goHome = () => {
		//remove la partie
		navigate("/home")
	}

	const disconnect = () => {
		localStorage.removeItem("jwt")
		navigate("/")
	}

	return (
		<>
			<header>
				<nav className="navbar bg-dark opacity-75 fixed-top p-2">
					<div className="container-fluid p-0 m-0">
						<h1 onClick={ goHome } className="navbar-brand text-bg-dark fw-bolder fs-1 m-0 p-0">Pong.</h1>
						<Button type="submit" onClick={() => disconnect()}
							className="rounded-0 btn btn-dark fw-bolder">DISCONNECT</Button>
					</div>
				</nav>
			</header>
			<main>
				<div className="position-fixed top-0">
					<Gameplay canva={ canva } className="backgroud-canvas"
					elem={ n } color={ color }/>
				</div>
				<div>
					<Settings/>
					<Skin elem={ n } color={ color } setN={ setN } setColor={ setColor }/>
					<Button onClick={goPlay} className="local-submit">PLAY</Button>
				</div>
			</main>
		</>
	)
}

export default Local
