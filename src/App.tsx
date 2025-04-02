import type { Schema } from "../amplify/data/resource";
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { uploadData, getUrl } from "aws-amplify/storage";
import "./App.css";

const client = generateClient<Schema>();

export default function TodoList() {
  const [todos, setTodos] = useState<Schema["Todo"]["type"][]>([]);
  const [todoImages, setTodoImages] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const sub = client.models.Todo.observeQuery().subscribe({
      next: async ({ items }) => {
        console.log("Subscription update:", items);
        setTodos([...items]);

        const imageUrls: { [key: string]: string } = {};
        for (const todo of items) {
          if (todo.profilePic) {
            const { url } = await getUrl({ key: todo.profilePic });
            imageUrls[todo.id] = url.toString();
          }
        }
        setTodoImages(imageUrls);
      },
      error: (error) => console.error("Subscription error:", error),
    });
    return () => sub.unsubscribe();
  }, []);

  const createTodo = async () => {
    const content = window.prompt("Todo content?");
    if (!content) return;

    try {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";
      fileInput.onchange = async (event: Event) => { // Explicitly type the event
        const target = event.target as HTMLInputElement; // Cast to HTMLInputElement
        const file = target.files?.[0];
        if (!file) return;

        const s3Key = `profile-pics/${Date.now()}-${file.name}`;
        await uploadData({
          key: s3Key,
          data: file,
          options: { contentType: file.type },
        }).result;

        const result = await client.models.Todo.create({
          content,
          isDone: false,
          profilePic: s3Key,
        });
        console.log("Todo created:", result);
      };
      fileInput.click();
    } catch (error) {
      console.error("Error uploading or creating todo:", error);
    }
  };

  return (
    <div className="todos">
      <button onClick={createTodo}>Add new todo</button>
      <ul>
        {todos.length === 0 ? (
          <li>No todos yet</li>
        ) : (
          todos.map(({ id, content, profilePic }) => (
            <li key={id} className="todo-item">
              <img
                src={todoImages[id] || "https://via.placeholder.com/50"}
                alt="Profile"
                className="profile-pic"
                onError={(e) =>((e.target as HTMLImageElement).src = "https://via.placeholder.com/50")}
              />
              <span>{content}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}