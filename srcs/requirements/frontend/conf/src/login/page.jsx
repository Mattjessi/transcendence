import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import Gameplay from "../gameplay/menu/page.jsx"
import UserPass from "./UserPass.jsx"
import ResizeScreen from "../global/resize-screen.jsx"
import './style.css'

function Login() {

	const canva = useRef(null)

	const navigate = useNavigate()

	const { resize } = ResizeScreen()

	useEffect(() => {

		const token = localStorage.getItem('jwt')

		if (token)
		  navigate('/home')
	  }, [navigate])

	useEffect(() => {

		if (canva.current) {
			canva.current.style.filter = 'blur(5px)'
		}

	}, [])

	return (
		<>
			<header>
				<nav className="navbar fixed-top p-2">
					<div className="container-fluid p-0 m-0">
						<h1 className="navbar-brand text-bg-dark fw-bolder fs-1 m-0 p-0">Pong.</h1>
					</div>
				</nav>
			</header>
			<main>
				<div className="position-fixed">
					<Gameplay canva={canva} className="background-canvas"/>
				</div>
				<div className="position-absolute top-0 d-flex justify-content-center align-items-center vh-100 w-100">
					<div className="text-bg-dark px-3 px-lg-5 pt-2 pt-lg-4 pb-3 pb-lg-4">
						<UserPass/>
					</div>
				</div>
			</main>
		</>
	)
}

export default Login
