'use client';

import React from 'react';
import { useEffect } from 'react';	
import NavbarItem from "./NavbarItem";

export default function Navbar() {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          const burgerMenu = document.getElementById('burgerMenu') as HTMLInputElement;
          const label = document.querySelector('.burgerMenu') as HTMLElement;
    
          // Check that no click has been made on the checkbox or its label 
          if (burgerMenu && label && !label.contains(event.target as Node) && !burgerMenu.contains(event.target as Node)) {
            burgerMenu.checked = false;
          }
        };

        const handleResize = () => {
            const burgerMenu = document.getElementById('burgerMenu') as HTMLInputElement;

            // Close the menu if the screen width is greater or equal than 1280px
            if (burgerMenu && window.innerWidth >= 1280) {
                burgerMenu.checked = false;
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            const burgerMenu = document.getElementById('burgerMenu') as HTMLInputElement;

            // Close the menu if the escape key is pressed
            if (event.key === 'Escape' && burgerMenu && burgerMenu.checked) {
                burgerMenu.checked = false;
            }
        };
    
        // Add a click and keydown event listener to the entire document and a resize event listener to the window
        document.addEventListener('click', handleClickOutside);
        window.addEventListener('resize', handleResize);
        document.addEventListener('keydown', handleKeyDown);
    
       // Clean the listener when the component is destroyed 
        return () => {
          document.removeEventListener('click', handleClickOutside);
          window.addEventListener('resize', handleResize);
          document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <nav>
            <div
                className="boxBorderYellow backRedStroke responsiveMenu"
            >
                <a
                    href="/"
                >
                    <img
                        src="/images/logo.svg"
                        alt="logo Super Pong"
						width="622"
						height="334"
						role="img"
                    />
                </a>
            </div>
            <input
                type="checkbox"
                id="burgerMenu"
                name="burgerMenu"
            />
            <label
                className="burgerMenu"
                htmlFor="burgerMenu"
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                    const burgerMenu = document.getElementById('burgerMenu');
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        if (burgerMenu)
                            (burgerMenu as HTMLInputElement).click();
                    }
                }}
            >
                <svg
                    viewBox="0 0 59 44"
                    aria-label="buger menu"
                >
                    <g
                        transform="matrix(1,0,0,1,-2.70322,-10.095)"
                    >
                        <g>
                            <path
                                d="M60.966,16.902C60.966,14.483 59.005,12.522 56.586,12.522C45.72,12.522 17.619,12.522 6.753,12.522C4.334,12.522 2.373,14.483 2.373,16.902C2.373,16.903 2.373,16.904 2.373,16.906C2.373,19.325 4.334,21.286 6.753,21.286C17.619,21.286 45.72,21.286 56.586,21.286C59.005,21.286 60.966,19.325 60.966,16.906C60.966,16.904 60.966,16.903 60.966,16.902Z"
                            />
                        </g>
                        <g>
                            <path
                                d="M60.966,16.902C60.966,14.483 59.005,12.522 56.586,12.522C45.72,12.522 17.619,12.522 6.753,12.522C4.334,12.522 2.373,14.483 2.373,16.902C2.373,16.903 2.373,16.904 2.373,16.906C2.373,19.325 4.334,21.286 6.753,21.286C17.619,21.286 45.72,21.286 56.586,21.286C59.005,21.286 60.966,19.325 60.966,16.906C60.966,16.904 60.966,16.903 60.966,16.902Z"
                            />
                        </g>
                        <g>
                            <path
                                d="M60.966,16.902C60.966,14.483 59.005,12.522 56.586,12.522C45.72,12.522 17.619,12.522 6.753,12.522C4.334,12.522 2.373,14.483 2.373,16.902C2.373,16.903 2.373,16.904 2.373,16.906C2.373,19.325 4.334,21.286 6.753,21.286C17.619,21.286 45.72,21.286 56.586,21.286C59.005,21.286 60.966,19.325 60.966,16.906C60.966,16.904 60.966,16.903 60.966,16.902Z"
                            />
                        </g>
                    </g>
                </svg>
            </label>
            <ul
                className="scrollbar"
            >
                <NavbarItem/>
            </ul>
            <div
                className="boxBorderYellow backRedStroke"
            />
        </nav>
    );
}
