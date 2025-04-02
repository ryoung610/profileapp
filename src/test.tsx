import type { Schema } from '../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';
import { useState, useEffect} from 'react';


const client = generateClient<Schema>()

export default function TodoList() {
  const [todos, setTodos] = useState<Schema["Todo"]["type"][]>([]);

  const fetchTodos = async () => {
    
    const { data: items, errors} = await client.models.Todo.list();
    console.error('Error fetching todos:', errors);
    if (items) {
      setTodos(items);
    }
  };


  useEffect(() => {
    fetchTodos();
  }, []);


  const createTodo = async () => {
    const content = window.prompt("Todo content?");
    if (content) {
      await client.models.Todo.create({
        content,
        isDone: false
      });
      // Fetch updated todos after creating a new one
      fetchTodos();
    }
  };

  return (
  <div>
    <button onClick={createTodo}>Add new todo</button>
    <ul>
      {todos.map(({ id, content }) => (
        <li key={id}>{content}</li> 
      ))}
  </ul>
  </div>
  );
}
