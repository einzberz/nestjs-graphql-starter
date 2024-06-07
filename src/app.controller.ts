import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';
import { UsersService } from './users/users.service';
@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) {}
  constructor(private readonly userService: UsersService) {}
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }
}
