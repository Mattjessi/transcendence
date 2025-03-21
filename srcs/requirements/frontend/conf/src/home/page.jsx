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
		<div>
			<div className="position-fixed top-0">
				<Gameplay canva={canva} className="background-canvas"/>
			</div>
			<h1 className="position-absolute top-0 left-0 m-1 p-1 text-bg-dark fw-bolder fs-1">Pong.</h1>
			<div class="d-flex position-absolute top-0 vh-100 w-100 justify-content-end align-items-start">
				<Button type="submit" onClick={() => disconnect()}
					className="m-1 p-1 rounded-0 btn btn-dark fw-bolder">DISCONNECT</Button>
			</div>
			<GameMenu/>
		</div>
	)
}

export default Home
