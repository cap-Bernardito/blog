import { UserDTO } from "../api/types";
import { User } from "../model/types/user-schema";

export function mapUser(dto: UserDTO): User {
  return {
    id: dto.id,
    first: dto.first,
    lastname: dto.lastname,
    city: dto.city,
    avatar: dto.avatar,
    username: dto.username,
    age: dto.age + "",
    currency: dto.currency,
    country: dto.country,
  };
}
