import { Controller, Get, Res, StreamableFile } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  @Get()
  getHello(@Res() res: Response): void {
    const html = `
    <html>
      <head>
        <meta http-equiv="refresh" content="3;url=https://pos-master-frontend-web.vercel.app/login"> 
      </head>
      <body>
        <h1>Redirecting to Dashboard...</h1>
        <p>If you are not redirected automatically, <a href="https://pos-master-frontend-web.vercel.app/login"  target="_blank">click here</a>.</p>
      </body>
    </html>
  `;
    res.type('html');
    res.send(html);
  }

  @Get('printfiles')
  downloadExe(@Res() res: Response): StreamableFile {
    const filePath = join(__dirname, '..', 'public', 'app.exe');
    const file = createReadStream(filePath);
    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': 'attachment; filename="app.exe"',
    });
    return new StreamableFile(file);
  }
}