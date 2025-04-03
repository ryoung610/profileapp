/*import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { uploadData, getUrl } from "aws-amplify/storage";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { fetchUserAttributes, updateUserAttributes } from "aws-amplify/auth";
import "./App.css";
import type { Schema } from "../amplify/data/resource";

const client = generateClient<Schema>();

export default function TodoList() {
  const [todos, setTodos] = useState<Schema["Todo"]["type"][]>([]);
  const [profilePics, setProfilePics] = useState<{ [key: string]: string }>({}); // Map owner to pic URL
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  // Fetch all todos (public)
  useEffect(() => {
    const sub = client.models.Todo.observeQuery().subscribe({
      next: async ({ items }) => {
        console.log("Subscription update:", items);
        setTodos([...items]);

        // Fetch profile pics for all owners
        const uniqueOwners = [...new Set(items.map((todo) => todo.owner).filter(Boolean))];
        const imageUrls: { [key: string]: string } = {};
        for (const owner of uniqueOwners) {
          const attributes = await fetchUserAttributesBySub(owner);
          const profilePicKey = attributes?.profilePicture;
          if (profilePicKey) {
            const { url } = await getUrl({ key: profilePicKey });
            imageUrls[owner] = url.toString();
          }
        }
        setProfilePics(imageUrls);
      },
      error: (error) => console.error("Subscription error:", error),
    });
    return () => sub.unsubscribe();
  }, []);

  // Helper to fetch user attributes by sub (requires admin API or workaround)
  const fetchUserAttributesBySub = async (sub) => {
    // This requires a custom API or admin access; for now, assume owner is username
    return { preferredUsername: sub, profilePicture: null }; // Placeholder
  };

  const createTodo = async () => {
    if (!user) {
      alert("Please sign in to create a todo");
      return;
    }
    const content = window.prompt("Todo content?");
    if (!content) return;

    try {
      const result = await client.models.Todo.create({
        content,
        isDone: false,
        owner: user.attributes?.sub,
      });
      console.log("Todo created:", result);
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const updateProfilePic = async () => {
    if (!user) return;
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = async (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (!file) return;

      const s3Key = `profile-pics/${user.attributes?.sub}-${file.name}`;
      await uploadData({
        key: s3Key,
        data: file,
        options: { contentType: file.type },
      }).result;

      await updateUserAttributes({
        userAttributes: { "custom:profilePicture": s3Key },
      });
      const { url } = await getUrl({ key: s3Key });
      setProfilePics((prev) => ({ ...prev, [user.attributes?.sub]: url.toString() }));
    };
    fileInput.click();
  };

  return (
    <Authenticator>
      {() => (
        <div className="todos">
          <div>
            {user ? (
              <>
                <span>Welcome, {user.attributes?.preferred_username}</span>
                <button onClick={signOut}>Sign Out</button>
                <button onClick={updateProfilePic}>Update Profile Pic</button>
              </>
            ) : (
              <span>Sign in to create todos</span>
            )}
          </div>
          <button onClick={createTodo} disabled={!user}>
            Add new todo
          </button>
          <ul>
            {todos.length === 0 ? (
              <li>No todos yet</li>
            ) : (
              todos.map(({ id, content, owner }) => (
                <li key={id} className="todo-item">
                  <img
                    src={profilePics[owner] || "https://via.placeholder.com/50"}
                    alt="Profile"
                    className="profile-pic"
                    onError={(e) => ((e.target as HTMLImageElement).src = "https://via.placeholder.com/50")}
                  />
                  <span>{content}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </Authenticator>
  );
}
  */