import React, { useRef, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap"
import Gameplay from '../gameplay/settings/page'
import GameMenu from "./gamemenu/page"
import ResizeScreen from "../global/resize-screen.jsx"
import FriendModal from "../global/friend-modal.jsx"
import QuitModal from "../global/quit-modal.jsx"
import './style.css'

function Home() {

	const navigate = useNavigate()

	const canva = useRef(null)

	const { resize } = ResizeScreen()
	const [friend, setFriend] = useState(false)
	const [quit, setQuit] = useState(false)

	//verif login

	useEffect(() => {

		const token = localStorage.getItem('jwt')

		if (!token)
		  navigate('/')
	  }, [navigate])

	return (
		<>
			<header>
				<nav className="navbar bg-dark opacity-75 fixed-top p-2">
					<div className="container-fluid p-0 m-0">
						<h1 className="navbar-brand text-bg-dark fw-bolder fs-1 m-0 p-0">Pong.</h1>
						<Button className="rounded-0 btn btn-dark fw-bolder"><i className="home-icon bi bi-house-fill"></i></Button>
						<Button className="rounded-0 btn btn-dark fw-bolder" onClick={() => setFriend(true)}><i className="home-icon bi bi-people-fill"></i></Button>
						<Button className="rounded-0 btn btn-dark fw-bolder" onClick={() => setQuit(true)}><i className="home-icon bi bi-power"></i></Button>
					</div>
				</nav>
			</header>
			<main>
				<div className="position-fixed top-0">
					<Gameplay canva={canva} className="background-canvas"/>
				</div>
				<GameMenu/>
			</main>
			<FriendModal friend={ friend } setFriend={ setFriend }/>
			<QuitModal quit={ quit } setQuit={ setQuit }/>
		</>
	)
}

export default Home
