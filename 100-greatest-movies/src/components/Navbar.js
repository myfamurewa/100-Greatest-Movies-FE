import React from 'react'
import {Nav, Bars, NavMenu, NavLink, NavBtn, NavBtnLink} from "./NavbarElements"
import { FcFilmReel } from "react-icons/fc";
export default function Navbar() {
    return (
        <>
            <Nav>
                <NavLink to="/home">
                    <FcFilmReel size={55} />
                </NavLink>
                <Bars />
                <NavMenu>
                    <NavLink to="/something">
                        About
                    </NavLink>
                    <NavLink to="/custom">
                        Custom List
                    </NavLink>
                    <NavLink to="/contact">
                        Contact Us
                    </NavLink>
                    <NavLink to="/sign-up">
                        sign-up
                    </NavLink>
                    <NavBtnLink to='/signin'>Sign In</NavBtnLink>
                </NavMenu>
                {/* <NavBtn>
                    <NavBtnLink to='/signin'>Sign In</NavBtnLink>
                </NavBtn> */}
            </Nav>
        </>
    )
}
