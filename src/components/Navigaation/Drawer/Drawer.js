import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Backdrop from "../../Backdrop/Backdrop";
import classes from './Drawer.module.css';

const links = [
    {to: '/', name: 'List'},
    {to: '/auth', name: 'Auth'},
    {to: '/quiz-create', name: 'Create Test'}
];

class Drawer extends Component {

    render() {
        const cls = [classes.Drawer];

        if(!this.props.isOpen) {
            cls.push(classes.close);
        }

        return(
            <React.Fragment>
                {this.props.isOpen ? <Backdrop closeBackdrop={this.props.closeBackdrop} /> : null}

                <nav className={cls.join(' ')}>
                    <ul>
                        { links.map((link, index) => {
                            return(
                                <li key={index}>
                                    <NavLink 
                                        to={link.to} 
                                        className={(data) => data.isActive ? classes.active : null}
                                        onClick={this.props.closeBackdrop}
                                    >
                                        {link.name}
                                    </NavLink>
                                </li>
                            );
                        }) }
                    </ul>
                </nav>
            </React.Fragment>
        )
    }
}

export default Drawer;
