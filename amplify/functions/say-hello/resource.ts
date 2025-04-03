import { defineFunction } from '@aws-amplify/backend';

export const sayHello = defineFunction({
  name: 'say-hello',      // Cloud-facing name
  entry: './handler.ts',    // Entry point
});