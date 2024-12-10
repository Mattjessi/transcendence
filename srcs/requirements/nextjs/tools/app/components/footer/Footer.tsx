import React from "react";
import Image from "next/image";
import svgHeart from '/public/images/heart.svg';

export default function HomeBloc() {
    return (
        <>
            <div
                className="boxBorderYellow backRedStroke"
            >
            </div>
            <div
            >
                <p>
                    Developed with
                        <Image
                            className="d-inline-block align-text-top"
                            src={svgHeart}
                            alt="love"
                            priority={false}
                        />
                    by mcordes
                </p>
            </div>
            <div
                className="boxBorderYellow backRedStroke"
            >
            </div>
        </>
    )
}