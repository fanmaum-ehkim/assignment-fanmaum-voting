import { Controller } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  async getUserById(id: number) {
    return this.userService.findById(id);
  }
}
