import React from "react";
import classes from './MenuToggle.module.css';

const MenuToggle = (props) => {
    const cls = [
        classes.MenuToggle,
        'las'
    ];

    if(props.isOpen){
        cls.push('la-times');
        cls.push(classes.open);
    } else { 
        cls.push('la-bars');
    }

    return(
        <i 
            className={cls.join(' ')}
            onClick={props.onToggle}
        />
    )
}

export default MenuToggle;