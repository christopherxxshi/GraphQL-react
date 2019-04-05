import React from 'react';
import './styles/style.css';
import UserListContainer from './containers/UserListContainer';
import TodoListContainer from './containers/TodoListContainer';
import AddTodoContainer from './containers/AddTodoContainer';
import UpdateTodoContainer from './containers/UpdateTodoContainer';
import { Route, Switch } from 'react-router-dom';

const App = () => {
    return <Switch>
        <Route exact path='/' component={UserListContainer}/>
        <Route path='/todos/:userId' component={TodoListContainer}/>
        <Route path='/addTodo/:userId' component={AddTodoContainer}/>
        <Route path='/updateTodo/:todoId' component={UpdateTodoContainer}/>
    </Switch>
};

export default App;
