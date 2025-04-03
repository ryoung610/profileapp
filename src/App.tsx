import { useState } from 'react';
import { client } from './test';  // Make sure this is the correct import for your generated client
import './App.css';

function App() {
  const [message, setMessage] = useState<string>('');

  const fetchHelloMessage = async () => {
    try {
      const response = await client.graphql({
        query: `query SayHello($name: String!) {
          sayHello(name: $name)
        }`,
        variables: { name: 'Bobby' }, // Pass the name argument here
      });

      // Check the structure of the response object
      console.log('Response:', response);

      // Ensure we correctly extract the response
      if ('data' in response && response.data?.sayHello) {
        setMessage(response.data.sayHello);
      } else {
        setMessage('No message returned or error in the response');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error occurred while invoking Lambda');
    }
  };

  return (
    <div className='todos'>
      <h1>Amplify Gen 2 Hello</h1>
      <p>Message: {message}</p>
      <button onClick={fetchHelloMessage}>Say Hello</button>
    </div>
  );
}

export default App;
