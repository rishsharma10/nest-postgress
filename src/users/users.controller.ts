import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Req() req,@Body() createUserDto: CreateUserDto) {
    const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress) as string;
    return await this.usersService.register(createUserDto,ip);
  }

}
