// app/utils/generateUsername.ts
import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator';
export async function GenerateRandomUsername() {
  const res = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt:
          "Please generate a random username for my application user, you can keep it childish or something related cartoon or a character, just return one username without any extra character, since your response will be set as the username",
      }),
  });
  const data = await res.json();
  return data.result;
}

export function GenerateRandomUsernameLocal() {
  return uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
    separator: '',
    style: 'capital',
    length: 2
  }) + Math.floor(Math.random() * 1000);
}
