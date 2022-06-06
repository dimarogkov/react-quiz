import React, { Component } from "react";
import Backdrop from "../../Backdrop/Backdrop";
import classes from './Drawer.module.css';

const links = [1,2,3];

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
                                    <span>Link - {link}</span>
                                </li>
                            )
                        }) }
                    </ul>
                </nav>
            </React.Fragment>
        )
    }
}

export default Drawer;