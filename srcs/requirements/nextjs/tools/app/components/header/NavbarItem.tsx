import React from "react";
import { items } from '../../assets/data/navbarItems';

export default function NavbarItem() {

    return (
        <>
            {items.map(item => (
				<li
					key={item.id}
				>
					<a
						href={item.href}
					>
                        <div>
                            <img
                                src={item.img}
                                alt={item.alt}
                                width="30px"
                                height="30px"
								role="img"
                            />
                        </div>
                        {item.title}
					</a>
				</li>
            ))}
        </>
    )
}
