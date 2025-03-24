import React, { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap"
import Gameplay from '../gameplay/settings/page'
import GameMenu from "./gamemenu/page"
import ResizeScreen from "../global/resize-screen.jsx"
import './style.css'

function Home() {

	const navigate = useNavigate()

	const canva = useRef(null)

	const { resize } = ResizeScreen()

	//verif login

	const disconnect = () => {
		localStorage.removeItem("jwt")
		navigate("/")
	}

	return (
		<>
			<header>
				<nav className="navbar bg-dark opacity-75 fixed-top p-2">
					<div className="container-fluid p-0 m-0">
						<h1 className="navbar-brand text-bg-dark fw-bolder fs-1 m-0 p-0">Pong.</h1>
						<Button type="submit" onClick={() => disconnect()}
							className="rounded-0 btn btn-dark fw-bolder">DISCONNECT</Button>
					</div>
				</nav>
			</header>
			<main>
				<div className="position-fixed top-0">
					<Gameplay canva={canva} className="background-canvas"/>
				</div>
				<GameMenu/>
			</main>
		</>
	)
}

export default Home
