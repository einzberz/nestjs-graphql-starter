import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  create(createUserInput: CreateUserInput): User {
    const newUser: User = {
      id: this.users.length + 1,
      ...createUserInput,
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    return this.users.find((user) => user.id === id);
  }

  update(id: number, updateUserInput: UpdateUserInput): User {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex >= 0) {
      const updatedUser = {
        ...this.users[userIndex],
        ...updateUserInput,
      };
      this.users[userIndex] = updatedUser;
      return updatedUser;
    }
    throw new Error(`User with ID ${id} not found`);
  }

  remove(id: number): User {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex >= 0) {
      const removedUser = this.users.splice(userIndex, 1)[0];
      return removedUser;
    }
    throw new Error(`User with ID ${id} not found`);
  }
}
