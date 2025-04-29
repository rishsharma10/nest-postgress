import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  private country_api :string
  private accessKey :string
  constructor(
    private configService: ConfigService,
  ){
    this.country_api = this.configService.get<string>('FETCH_COUNTRY_API')!
    this.accessKey = this.configService.get<string>('ACCESS_KEY')!
  }
  async getCountryFromIP(ip){
    let url = `${this.country_api} + ${ip} + '&accessKey='+ ${this.accessKey}`

  }

  async register(createUserDto: CreateUserDto,ip) {
    try {
    } catch (error) {
      throw error
    }
  }

 
}
