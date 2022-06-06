import React, { Component } from "react";
import Drawer from "../../components/Navigaation/Drawer/Drawer";
import MenuToggle from "../../components/Navigaation/MenuToggle/MenuToggle";
import classes from './Layout.module.css'

class Layout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            menu: false
        }
    }

    onToggle = () => {
        this.setState({
            menu: !this.state.menu
        });
    }

    closeBackdrop = () => {
        this.setState({
            menu: false
        });
    }

    render() {
        return(
            <div className={classes.Layout}>

                <Drawer
                    isOpen={this.state.menu}
                    closeBackdrop={this.closeBackdrop} />

                <MenuToggle
                    onToggle={this.onToggle}
                    isOpen={this.state.menu} />

                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Layout;