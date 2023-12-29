import { AxiosResponse } from "axios";
import { User } from "../users/users";

type Content = {
  id: string;
  author_id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  User: User;
  _count: {
    Comments: number;
    Likes: number;
  };
  likedByMe: boolean;
};

type ResponseGetAllContents = AxiosResponse<Content[]>;
