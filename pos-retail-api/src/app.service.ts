import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return { message: '<a href="https://pos-master-frontend-web.vercel.app/login">visit  here</a>' };
  }
}
