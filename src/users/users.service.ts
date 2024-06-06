import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import * as fs from 'fs';
import { error } from 'console';
@Injectable()
export class UsersService {
  private filePath: string = 'data/MOCKDATA.json';
  private users: User[] = this.readUser();

  private readUser(): User[] {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (err) {
      console.error('Error reading file:', err);
      return [];
    }
  }
  private writeUsers(): void {
    try {
      fs.writeFileSync(
        this.filePath,
        JSON.stringify(this.users, null, 2),
        'utf8',
      );
    } catch {
      console.log(error);
    }
  }

  create(createUserInput: CreateUserInput): User {
    const newUser: User = {
      id: this.users.length + 1,
      ...createUserInput,
    };
    this.users.push(newUser);
    this.writeUsers();
    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    console.log(this.users.find((user) => user.id == id));
    return this.users.find((user) => user.id == id);
  }

  update(id: number, updateUserInput: UpdateUserInput): User {
    const userIndex = this.users.findIndex((user) => user.id == id);
    if (userIndex >= 0) {
      const updatedUser = {
        ...this.users[userIndex],
        ...updateUserInput,
      };
      this.users[userIndex] = updatedUser;
      this.writeUsers();
      return updatedUser;
    }
    throw new Error(`User with ID ${id} not found`);
  }

  remove(id: number): User {
    const userIndex = this.users.findIndex((user) => user.id == id);
    if (userIndex >= 0) {
      const removedUser = this.users.splice(userIndex, 1)[0];
      this.writeUsers();
      return removedUser;
    }
    throw new Error(`User with ID ${id} not found`);
  }
}
