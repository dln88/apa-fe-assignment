import { BASE_API_URL } from "@/consts";

export default async function customizedFetch(path: string) {
  const response = await fetch(BASE_API_URL + path);
    if (!response.ok) throw new Error("An error has occurred");
  return await response.json();
}
