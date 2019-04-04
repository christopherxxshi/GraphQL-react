import React from 'react';
import TodoItem from './TodoItem';

const TodoList = (props) => {
    if(!props.todos.length) {
        return null;
    }
    return <div className="todo__list">
        {
            props.todos.map((item, index) => {
                return <TodoItem key={index} {...item} deleteTodoItem = {(id)=>props.deleteTodoItem(id)}/>;
            })
        }
    </div>
}

export default TodoList
