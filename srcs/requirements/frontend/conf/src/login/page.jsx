import React, { useEffect, useRef, useState } from "react"
import Gameplay from "../gameplay/menu/page.jsx"
import UserPass from "./UserPass.jsx"
import ResizeScreen from "../global/resize-screen.jsx"
import './style.css'

function Login() {

	const canva = useRef(null)

	const { resize } = ResizeScreen()

	useEffect(() => {

		if (canva.current) {
			canva.current.style.filter = 'blur(5px)'
		}

	}, [])

	return (
		<div className="overflow-hidden vh-100">
			<div className="position-fixed">
				<Gameplay canva={canva} className="background-canvas"/>
			</div>
			<h1 className="position-absolute top-0 left-0 m-1 p-1 text-bg-dark fw-bolder fs-1">Pong.</h1>
			<div className="position-absolute top-0 d-flex justify-content-center align-items-center vh-100 w-100">
				<div className="text-bg-dark px-3 px-lg-5 pt-2 pt-lg-4 pb-3 pb-lg-4">
					<UserPass/>
				</div>
			</div>
		</div>
	)
}

export default Login
