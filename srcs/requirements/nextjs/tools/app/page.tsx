import React from 'react';
import Link from "next/link";
import Image from "next/image";
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
                <Link
                    className= "boxBorderYellow mainBoxBorderWidth justifyContentFlexbox homeElements box"
                    href={item.href}
                    key={item.id}
                    style={{
                        backgroundColor: item.backColor,
                        backgroundImage: `url(${item.backImg})`,
                        backgroundSize: '70px',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'repeat',
                        fontSize: '1.25rem',
                    }}
                    prefetch
                >
                    <div>
                        <Image
                            src={item.img}
                            alt={item.alt}
                            width={60}
                            height={60}
                            priority={false}
                        />
                    </div>
                    {item.title}
                </Link>
            ))}
        </>
    );
}