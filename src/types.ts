export type User = {
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
};

export type UserApiData = { data: User[] };
