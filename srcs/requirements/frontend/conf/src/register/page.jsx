import React, { useEffect, useRef } from "react"
import Gameplay from "../gameplay/menu/page.jsx"
import UserPass from "./UserPass.jsx"
import ResizeScreen from "../global/resize-screen.jsx"
import './style.css'

function Register() {

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
			<div className="position-absolute top-0 d-flex justify-content-center align-items-center vh-100 w-100">
				<div className="text-bg-dark px-3 px-lg-5 pt-2 pt-lg-4 pb-3 pb-lg-4">
					<h1 className="display-4 display-lg-1 fw-bolder text-center mb-4">Pong.</h1>
					<UserPass/>
				</div>
			</div>
		</div>
	)
}

export default Register
