import Users from './data/users';
import Todos from './data/todos';
import find from 'lodash/find';
import concat from  "lodash/concat";
import filter from 'lodash/filter';
import sumBy from 'lodash/sumBy';
import remove from  "lodash/remove";

import {
GraphQLInt,
        GraphQLBoolean,
        GraphQLString,
        GraphQLList,
        GraphQLObjectType,
        GraphQLNonNull,
        GraphQLSchema,
} from 'graphql';

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Users in company',
    fields: () => ({
            id: {type: new GraphQLNonNull(GraphQLString)},
            first_name: {type: new GraphQLNonNull(GraphQLString)},
            last_name: {type: new GraphQLNonNull(GraphQLString)},
            email: {type: GraphQLString},
            gender: {type: GraphQLString},
            department: {type: new GraphQLNonNull(GraphQLString)},
            country: {type: new GraphQLNonNull(GraphQLString)},
            todo_count: {
                type: GraphQLInt,
                resolve: (user) => {
                    return sumBy(Todos, todo => todo.userId === user.id ? 1:0);
                }
            },
            todos: {
                type: new GraphQLList(TodoType),
                resolve: (user, args) => {
                    return filter(Todos, todo => todo.userId === user.id);
                }
            }
        })
});

const TodoType = new GraphQLObjectType({
    name: 'Todo',
    description: 'Task for user',
    fields: () => ({
            id: {type: new GraphQLNonNull(GraphQLString)},
            title: {type: GraphQLString},
            completed: {type: new GraphQLNonNull(GraphQLBoolean)},
            user: {
                type: UserType,
                resolve: (todo, args) => {
                    return find(Users, user => user.id === todo.userId);
                }
            }
        })
});

const TodoQueryRootType = new GraphQLObjectType({
    name: 'TodoAppSchema',
    description: 'Root Todo App Schema',
    fields: () => ({
            users: {
                args: {
                    id : {type:GraphQLString},
                    first_name: {type: GraphQLString},
                    last_name: {type: GraphQLString},
                    department: {type: GraphQLString},
                    country: {type: GraphQLString},
                },
                type: new GraphQLList(UserType),
                description: 'List of Users',
                resolve: (parent, args) => {
                    if (Object.keys(args).length) {
                        return filter(Users, args);
                    }
                    return Users;
                }
            },
            todos: {
                args: {
                    id : {type:GraphQLString},
                    userId: {type: GraphQLString},
                    completed: {type: GraphQLBoolean},
                },
                type: new GraphQLList(TodoType),
                description: 'List of Todos',
                resolve: (parent, args) => {
                    if (Object.keys(args).length){
                        return filter(Todos, args);
                    }
                    return Todos;
                }
            }
        })
});

const TodoMutationRootType = new GraphQLObjectType({
    name: 'TodoAppMutations',
    description: 'change todos',
    fields: () => ({
        deleteTodo: {
            args: {
                id: {type: GraphQLString},
            },
            type: TodoType,
            description: 'Delete Todo',
            resolve: (parent, args) => {
                if (Object.keys(args).length) {
                    let obj = filter(Todos, args)[0];
                    remove(Todos, args);
                    return obj;
                }
                return {};
            }
        },
        createTodo: {
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)},
                title: {type: GraphQLString},
                completed: {type: new GraphQLNonNull(GraphQLBoolean)},
                userId: {type: new GraphQLNonNull(GraphQLString)},
            },
            type: TodoType,
            description: 'Create Todo',
            resolve: (parent, args) => {
                if (Object.keys(args).length) {
                    Todos.push(args);
                    return filter(Todos, args)[0];
                }
                return {};
            }
        },
        updateTodo: {
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)},
                title: {type: GraphQLString},
                completed: {type: new GraphQLNonNull(GraphQLBoolean)},
                userId: {type: new GraphQLNonNull(GraphQLString)},
            },
            type: TodoType,
            description: 'Update Todo',
            resolve: (parent, args) => {
                if (Object.keys(args).length) {
                    for(let i = 0; i < Todos.length; i++){
                        if(Todos[i].id === args.id){
                            Todos[i] = args;
                        }
                    }
                    return filter(Todos, args)[0];
                }
                return {};
            }
        }
    })
});

const schema = new GraphQLSchema({
    query: TodoQueryRootType,
    mutation: TodoMutationRootType,
});

export default schema;
