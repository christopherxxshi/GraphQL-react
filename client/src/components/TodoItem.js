import React from 'react';
import UserName from './UserName';
import {Link}  from 'react-router-dom';

const TodoItem = (props) => {
    const completedClass = props.completed ? 'todo__item--completed' : '';
    return <div className={`todo__item ${completedClass}`}>
        <p className='todo__title'>{props.title}</p>
        <div className='todo__assignee'>
            <div className = 'todo__ulabel'>Assigned To:</div>
            <UserName {...props.user} />
        </div>
            <button className='user__todo-link' onClick = {()=>props.deleteTodoItem(props.id)} >Delete</button>
        <a href={`/updateTodo/${props.id}`}><button>Update Todos</button> </a>
    </div>
    
};

export default TodoItem;
