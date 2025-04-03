import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import  App  from './App'
import { Amplify } from 'aws-amplify'
import outputs from '../amplify_outputs.json'
import { generateClient } from "aws-amplify/api"
import type { Schema } from "../amplify/data/resource"



Amplify.configure(outputs);

const client = generateClient<Schema>()

client.queries.sayHello({
  name: "Amplify",
})


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
