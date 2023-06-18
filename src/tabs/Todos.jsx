import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
  };

  addTodo = text => {
    const toDo = {
      id: nanoid(),
      text,
    };
    this.setState(prevState => ({ todos: [...prevState.todos, toDo] }));
  };

  componentDidUpdate(_, prevState) {
    const { todos } = this.state;
    if (prevState.todos !== todos) {
      localStorage.setItem('toDo', JSON.stringify(todos));
    }
  }

  componentDidMount() {
    const toDos = JSON.parse(localStorage.getItem('toDo'));
    if (toDos) {
      this.setState({ todos: [...toDos] });
    }
  }

  deleteToDo = id => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  };
  render() {
    const { todos } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.addTodo} />
        <Grid>
          {todos.map((todo, index) => (
            <GridItem key={todo.id}>
              <Todo
                text={todo.text}
                counter={index + 1}
                deleteToDo={this.deleteToDo}
                id={todo.id}
              />
            </GridItem>
          ))}
        </Grid>
      </>
    );
  }
}
