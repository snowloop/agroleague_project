import { TSubjectWithoutMessages, IMessage } from "../types";

// TO BE REPLACED
const backEndUrl = "http://192.168.1.52:3000";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw Error(`${response.status}: ${JSON.stringify(response.json())}`);
  }
  return await response.json();
}

export async function getSubjects() {
  const response = await fetch(`${backEndUrl}/forum/subjects`);
  return await handleResponse<TSubjectWithoutMessages[]>(response);
}

export async function getMessageList(id: string) {
  const response = await fetch(`${backEndUrl}/forum/messages/${id}`);
  return await handleResponse<IMessage[]>(response);
}

export async function postMessage(id: string, content: string) {
  const response = await fetch(`${backEndUrl}/forum/messages/${id}`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });
  return await handleResponse<IMessage[]>(response);
}
