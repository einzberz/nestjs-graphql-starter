import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    try {
      return await this.usersService.create(createUserInput);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Query(() => [User], { name: 'users' })
  async findAll() {
    try {
      return await this.usersService.findAll();
    } catch (error) {
      throw new Error('Error retrieving users');
    }
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    try {
      return await this.usersService.findOne(id);
    } catch (error) {
      throw new Error('Error retrieving user');
    }
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    try {
      return await this.usersService.update(
        updateUserInput.id,
        updateUserInput,
      );
    } catch (error) {
      throw new Error('Error updating user');
    }
  }

  @Mutation(() => User)
  async removeUser(@Args('id', { type: () => String }) id: string) {
    try {
      return await this.usersService.remove(id);
    } catch (error) {
      throw new Error('Error deleting user');
    }
  }
}
