import React, {Component} from 'react';

class AddTodoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            completed: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        if(event.target.name === "completed"){
            this.setState({[event.target.name]: event.target.value!=="false"});
        }else{
            this.setState({[event.target.name]: event.target.value});
        }

    }

    handleSubmit(event) {
        event.preventDefault();
        return this.props.submitHandler(this.state);
    }

    render() {
        return (
            <form className="user__form" onSubmit={this.handleSubmit}>
                <label>
                    Title:
                    <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                </label>

                <label>
                    Completed:
                    <select name="completed" value={this.state.completed} onChange={this.handleChange}>
                        <option value={false}>false</option>
                        <option value={true}>true</option>
                    </select>
                </label>
                <label>
                    <input type="submit" value="Submit" />
                </label>
            </form>
        );
    }
}

export default AddTodoForm;