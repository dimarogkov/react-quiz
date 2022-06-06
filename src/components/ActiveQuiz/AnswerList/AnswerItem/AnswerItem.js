import React from "react";
import classes from './AnswerItem.module.css';

const AnswerItem = (props) => {
    const cls = [classes.AnswerItem]

    if(props.questionClass){
        cls.push(classes[props.questionClass]);
    }

    return(
        <li className={cls.join(' ')} onClick={() => props.onAnswerClick(props.answer.id)}>
            {props.answer.text}
        </li>
    );
}

export default AnswerItem;