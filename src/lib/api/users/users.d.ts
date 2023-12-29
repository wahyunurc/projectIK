import { AxiosResponse } from "axios";

type User = {
  id: string;
  username: string;
  api_key: string;
  createdAt: string;
  updatedAt: string;
};

type ResponseCreateUser = AxiosResponse<User>;
