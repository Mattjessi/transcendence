import React from 'react';
import { items } from './assets/data/homePageItems';

export default function Home() {

    return (
        <>
            <div
                className= "boxBorderYellow mainBoxBorderWidth justifyContentFlexbox homeTopElement"
            >
                <h1>
                    SUPER PONG :
                    <br/>
                    <span>
                        THE ULTIMATE GAMING PLATFORM.
                    </span>
                </h1>
            </div>
            {items.map(item => (
                <a
                    className= "boxBorderYellow mainBoxBorderWidth justifyContentFlexbox homeElements box"
                    href={item.href}
                    key={item.id}
                >
                    <div>
                        <img
                            src={item.img}
                            alt={item.alt}
                            width="60px"
                            height="60px"
							role="img"
                        />
                    </div>
                    {item.title}
                </a>
            ))}
        </>
    );
}
