import { updateTodo } from "../actions";
import { Form, Input, CardHeader, CardText, CardFooter } from "reactstrap";
import { useInput } from "../hooks";

const todoForm = ({ updateTodo, history, location }) => {
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
  }, []);

  const submitTodo = e => {
    e.preventDefault();

    const todo = { title, task, date };
    const submit = capturedID ? updateSmurf;
    const args = capturedID ? [capturedID, todo] : [todo];

    submit(...args).then(() => history.push('/todolist'));

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
          value={setDate}
        />
        <Input type="submit" value="Update To Do" />
      </Form>
    </div>
  );
};

export default connect(
  null,
  { updateTodo }
)(UpdateTodo);