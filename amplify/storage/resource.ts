import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "amplifyChatDrive",
  access: (allow) => ({
    "public/{entity_id}/*": [
      allow.entity("identity").to(["read", "write", "delete"]),
    ],
  }),
});
