import { User } from "./user";

export interface Item {
  id?: number;
  title: string;
  description: string;
  completed: boolean;
  user: User;
}
