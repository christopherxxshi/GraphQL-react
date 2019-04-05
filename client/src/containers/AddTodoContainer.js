import React, {Component} from 'react';
import ApiService from '../ApiService';
import AddTodoForm from "../forms/AddTodoForm";
import uuid from  "uuid";

class AddTodoContainer extends Component {
    constructor(props){
        super(props);
        this.userid = this.props.match.params.userId;
        this.addTodo = this.addTodo.bind(this);
        this.state = {
            username: ""
        }
    }
    async  componentDidMount() {
        try{
            const data = (await ApiService.getUsers({id: this.userid}))[0];
            this.setState({username: `${data.first_name} ${data.last_name}`});
        }catch(e){
            console.error(`An error ${e.message}`)
        }
    }
    async addTodo(params){
        try{
            await ApiService.createTodo({...params, id:uuid(), userId: this.userid});
            this.props.history.push(`/todos/${this.userid}`)
        }catch (e) {
            console.error(`An error ${e.message}`)
        }
    }
    render() {

        return (
            <div className="todo__list">
                <label style={{marginTop: "30px"}} >Add Todo to {this.state.username}</label>
                <AddTodoForm submitHandler={this.addTodo}/>
            </div>
        );
    }
}

export default AddTodoContainer;