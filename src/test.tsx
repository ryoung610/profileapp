import type { Schema } from '../amplify/data/resource'; // Your Todo schema
import { generateClient } from 'aws-amplify/api'; // Import the client generator



// Generate a client with access to all backend resources
export const client = generateClient<Schema>({});
  // No additional config needed for sandbox or deployed env
