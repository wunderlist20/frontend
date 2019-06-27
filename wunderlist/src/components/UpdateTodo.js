import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { updateTodo } from './actions/actions';
import { Form, Input } from 'reactstrap';

const useInput = () => {
  const [value, setValue] = useState('');

  const updateValue = e => {
    setValue(e.target.value);
  };

  return [value, setValue, updateValue];
};

const TodoForm = ({ updateTodo, history, location }) => {
  const [title, setTitle, updateTitle] = useInput();
  const [task, setTask, updateTask] = useInput();
  const [date, setDate, updateDate] = useInput();
  const [capturedID, setCapturedID] = useInput();

  useEffect(() => {
    const { state } = location;
    if (state) {
      console.log(state);
      const [id, title, task, date] = state;
      setTitle(title);
      setTask(task);
      setDate(date);
      setCapturedID(id);
    }
  }, [location, setCapturedID, setDate, setTask, setTitle]);

  const submitTodo = e => {
    e.preventDefault();

    const todo = { title, task, date };

    updateTodo(capturedID, todo).then(() => history.push('/todolist'));

    setTitle('');
    setTask('');
    setDate('');
  };

  return (
    <div>
      <h2>Update Todo</h2>
      <Form onSubmit={submitTodo}>
        <Input
          type="text"
          onChange={updateTitle}
          placeholder="label"
          value={title}
        />
        <Input
          type="text"
          onChange={updateTask}
          placeholder="task"
          value={task}
        />
        <Input
          type="text"
          onChange={updateDate}
          placeholder="due"
          value={date}
        />
        <Input type="submit" value="Update To Do" />
      </Form>
    </div>
  );
};

export default connect(
  null,
  { updateTodo }
)(TodoForm);
