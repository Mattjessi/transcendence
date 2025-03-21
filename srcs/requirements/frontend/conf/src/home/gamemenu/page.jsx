import React from "react"
import { useNavigate } from "react-router-dom"
import { Card } from "react-bootstrap"
import './style.css'

function GameMenu() {

	const navigate = useNavigate()

	return(
		<div className="d-flex justify-content-center align-items-center vh-100 w-100">
			<Card className="p-3 rounded-0 text-bg-dark">
      			<Card.Img
					variant="top"
					src="Local.svg"
					onClick={() => navigate("/local")}
					className=""/>
      			<Card.Body>
        			<Card.Title className="">Local</Card.Title>
      			</Card.Body>
    		</Card>
			<Card className="p-3 rounded-0 text-bg-dark">
      			<Card.Img
					variant="top"
					src="AI.svg"
					onClick={() => navigate("/home")}
					className=""/>
      			<Card.Body>
        			<Card.Title className="">AI</Card.Title>
      			</Card.Body>
    		</Card>
			<Card className="p-3 rounded-0 text-bg-dark">
      			<Card.Img
					variant="top"
					src="Crown.svg"
					onClick={() => navigate("/home")}
					className=""/>
      			<Card.Body>
        			<Card.Title className="">Tournament</Card.Title>
      			</Card.Body>
    		</Card>
			<Card className="p-3 rounded-0 text-bg-dark">
      			<Card.Img
					variant="top"
					src="Online.svg"
					onClick={() => navigate("/home")}
					className=""/>
      			<Card.Body>
        			<Card.Title className="">Online</Card.Title>
      			</Card.Body>
    		</Card>
			<Card className="p-3 rounded-0 text-bg-dark">
      			<Card.Img
					variant="top"
					src="Multiplayer.svg"
					onClick={() => navigate("/home")}
					className=""/>
      			<Card.Body>
        			<Card.Title className="">Multiplayer</Card.Title>
      			</Card.Body>
    		</Card>
		</div>
	)
}

export default GameMenu
