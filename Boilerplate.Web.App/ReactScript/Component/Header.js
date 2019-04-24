import React from 'react'
import { NavLink } from 'react-router-dom';
import { Menu, Container } from 'semantic-ui-react'

function Header() {
    return (
        <header style={headerstyle}>
            <Menu fixed='top' inverted>
                <Container>
                    <Menu.Item as='a'> <NavLink to="/customer"> Customer </NavLink> </Menu.Item>
                    <Menu.Item as='a'><NavLink to="/products"> Products </NavLink></Menu.Item>
                    <Menu.Item as='a'><NavLink to="/stores"> Stores </NavLink></Menu.Item>
                    <Menu.Item as='a'> <NavLink to="/sales"> Sales </NavLink></Menu.Item>
                </Container>
            </Menu>
        </header>
    )

}

const headerstyle = {
    background: 'black',
    border: '2px solid black',
    padding: '25px',
}

export default Header;