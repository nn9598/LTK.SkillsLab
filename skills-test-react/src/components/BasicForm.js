import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Formik, Field, Form } from 'formik';
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import Delete from '@mui/icons-material/Delete';

const BasicForm = () => {
  const [todos, setTodos] = useState([]);

  return (
    <div>
      <h1>TODO</h1>
      <Formik
        initialValues={{
          todo: ''
        }}
        onSubmit={(values, { resetForm }) => {
          setTodos([
            ...todos,
            values.todo
          ]);

          resetForm();
        }}
      >
        <Form>
          <Box sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: '80px 1fr 60px',
          }}>
            <label htmlFor="todo">Add ToDo </label>
            <Field id="todo" name="todo" placeholder="Text Here" />
            <button type="submit">Submit</button>
          </Box>
        </Form>
      </Formik>
      <Box sx={{textAlign: 'center', marginTop: '16px'}}>
        <h3 sx={{ minWidth: 100}}>ToDo List</h3>
        {!todos.length && <Typography>No items in ToDo List</Typography>}
        {
          todos.map((todo, index) => <TodoItem name={todo} index={index} todos={todos} setTodos={setTodos}/>)
        }
      </Box>
      
    </div>
  )
  
};

const TodoItem = ({name, index, todos, setTodos}) => {
  const deleteTodo = () => {
    const currentTodos = [
      ...todos
    ];

    currentTodos.splice(index, 1);

    setTodos(currentTodos);
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'lightGray', padding: '8px', borderRadius: '5px', marginTop: '12px' }}>
      <Typography sx={{ minWidth: 100 }}>{name}</Typography>
      <Tooltip title="Delete Todo">
        <IconButton
          onClick={deleteTodo}
          size="small"
          sx={{ ml: 2 }}
        >
          <Delete sx={{ width: 32, height: 32 }}></Delete>
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default BasicForm
