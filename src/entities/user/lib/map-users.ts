import { UserDTO } from "../api/types";
import { User } from "../model/types/user-schema";

import { mapUser } from "./map-user";

export function mapUsers(usersDTO: UserDTO[]): User[] {
  return usersDTO.map((dto) => mapUser(dto));
}
