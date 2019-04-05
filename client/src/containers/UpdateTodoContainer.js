import React, {Component} from 'react';
import ApiService from '../ApiService';
import AddTodoForm from "../forms/AddTodoForm";

class UpdateTodoContainer extends Component {
    constructor(props){
        super(props);
        this.todoId = this.props.match.params.todoId;
        this.updateTodo = this.updateTodo.bind(this);
        this.state = {
            title: "",
            completed: "",
            userId:"",
            fetching: true
        }
    }
    async componentWillMount() {
        try{
            this.setState({fetching:true})
            const data = (await ApiService.getTodos({id: this.todoId}))[0];
            this.setState({...data, fetching:false,  userId: data.user.id});
        }catch(e){
            console.error(`An error ${e.message}`)
        }
    }
    async updateTodo(params){
        try{
            await ApiService.updateTodo({ id:this.todoId, userId: this.state.userId, title: params.title, completed: params.completed});
            this.props.history.push(`/todos/${this.state.userId}`)
        }catch (e) {
            console.error(`An error ${e.message}`)
        }
    }
    render() {

        return (
            <div className="user">
                {!this.state.fetching?<AddTodoForm submitHandler={this.updateTodo} info = {this.state}/>:null}
            </div>
        );
    }
}

export default UpdateTodoContainer;