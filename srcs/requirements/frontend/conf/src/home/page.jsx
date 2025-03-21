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
		<div className="">
			<div className="position-fixed">
				<Gameplay canva={canva} className="background-canvas"/>
			</div>
			<div>
				<h1 className="position-absolute top-0 left-0 m-1 p-1 text-bg-dark fw-bolder fs-1">Pong.</h1>
				<GameMenu/>
				<Button type="submit" onClick={() => disconnect()}
					className="rounded-0 btn btn-secondary">DISCONNECT</Button>
			</div>
		</div>
	)
}

export default Home
