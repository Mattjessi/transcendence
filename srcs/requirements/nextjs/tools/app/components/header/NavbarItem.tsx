import React from "react";
import Link from "next/link";
import Image from "next/image";
import { items } from '../../assets/data/navbarItems';

export default function NavbarItem() {

    return (
        <>
            {items.map(item => (
                <Link
                    href={item.href}
                    key={item.id}
                    prefetch
                >
                    <li
                    style={{
                        backgroundImage: `url(${item.backImg})`,
                        backgroundSize: '70px',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'repeat',
                    }}
                    >
                        <div>
                            <Image
                                src={item.img}
                                alt={item.alt}
                                width={30}
                                height={30}
                                priority={false}
                            />
                        </div>
                        {item.title}
                    </li>
                </Link>
            ))}
        </>
    )
}