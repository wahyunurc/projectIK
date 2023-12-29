import { AxiosError } from "axios";
import fetcher from "../../axios";

export const verifyApiToken = async (apiKey) => {
  try {
    const response = await fetcher.get("/api/v1/users", {
      headers: {
        "x-api-key": apiKey,
      },
    });
    /** @type {import("./users").ResponseCreateUser} */
    const user = response.data;

    return user;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw err.response?.data.error?.message;
    }
    throw err;
  }
};

export const createUser = async () => {
  const response = await fetcher.post("/api/v1/users");
  /** @type {import("./users").ResponseCreateUser} */
  const user = response.data;

  return user;
};
