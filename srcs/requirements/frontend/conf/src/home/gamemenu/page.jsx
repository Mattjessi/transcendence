import React from "react"
import { useNavigate } from "react-router-dom"
import { Card } from "react-bootstrap"
import './style.css'

function GameMenu() {

	const navigate = useNavigate()

	return(
		<div class="d-flex vh-100 w-100 justify-content-center align-items-lg-center pt-5 pt-lg-0 px-xl-5">
			<div class="pt-5 pt-lg-0 px-xl-5">
				<div class="pb-5 pt-5 pt-lg-0 px-xl-5">
					<div className="container">
						<div className="justify-content-center align-items-center w-100 row px-5 g-1">
							<div
								role="button"
								onClick={() => navigate("/local")}
								class="col-6 col-sm-3 col-lg-2">
								<Card className="p-3 p-sm-4 p-xl-5 pb-0 rounded-0 text-bg-dark">
									<Card.Img
										variant="top"
										src="Local.svg"
										className=""/>
									<Card.Body class="pt-3 pt-sm-4 pt-xl-5 pb-3 pb-sm-0">
										<Card.Title className="row justify-content-center m-0">Local</Card.Title>
									</Card.Body>
								</Card>
							</div>
							<div
								role="button"
								onClick={() => navigate("/home")}
								class="col-6 col-sm-3 col-lg-2">
								<Card className="p-3 p-sm-4 p-xl-5 pb-0 rounded-0 text-bg-dark">
									<Card.Img
										variant="top"
										src="AI.svg"
										className=""/>
									<Card.Body class="pt-3 pt-sm-4 pt-xl-5 pb-3 pb-sm-0">
										<Card.Title className="row justify-content-center m-0">AI</Card.Title>
									</Card.Body>
								</Card>
							</div>
							<div
								role="button"
								onClick={() => navigate("/home")}
								class="col-6 col-sm-3 col-lg-2">
								<Card className="p-3 p-sm-4 p-xl-5 pb-0 rounded-0 text-bg-dark">
									<Card.Img
										variant="top"
										src="Crown.svg"
										className=""/>
									<Card.Body class="pt-3 pt-sm-4 pt-xl-5 pb-3 pb-sm-0">
										<Card.Title className="row justify-content-center m-0">Tournament</Card.Title>
									</Card.Body>
								</Card>
							</div>
							<div
								role="button"
								onClick={() => navigate("/home")}
								class="col-6 col-sm-3 col-lg-2">
								<Card className="p-3 p-sm-4 p-xl-5 pb-0 rounded-0 text-bg-dark">
									<Card.Img
										variant="top"
										src="Online.svg"
										className=""/>
									<Card.Body class="pt-3 pt-sm-4 pt-xl-5 pb-3 pb-sm-0">
										<Card.Title className="row justify-content-center m-0">Online</Card.Title>
									</Card.Body>
								</Card>
							</div>
							<div
								role="button"
								onClick={() => navigate("/home")}
								class="col-6 col-sm-3 col-lg-2">
								<Card className="p-3 p-sm-4 p-xl-5 pb-0 rounded-0 text-bg-dark">
									<Card.Img
										variant="top"
										src="Multiplayer.svg"
										className=""/>
									<Card.Body class="pt-3 pt-sm-4 pt-xl-5 pb-3 pb-sm-0">
										<Card.Title className="row justify-content-center m-0">Multiplayer</Card.Title>
									</Card.Body>
								</Card>
							</div>
							<div className="col-6 col-sm-9 col-lg-0">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default GameMenu
