import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ScreenshotParams } from './app.dto';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async createScreenshot(
    @Body(new ValidationPipe()) options: ScreenshotParams,
    @Res() res: Response,
  ) {
    const [stream, length] = await this.appService.createScreenshot(options);

    res.set({
      'Content-Type': 'image/png',
      'Content-Length': length,
    });

    stream.pipe(res);
  }

  @Get()
  async createScreenshotFromJustURL(
    @Query(new ValidationPipe()) options: ScreenshotParams,
    @Res() res: Response,
  ) {
    const [stream, length] = await this.appService.createScreenshot(options);

    res.set({
      'Content-Type': 'image/png',
      'Content-Length': length,
    });

    stream.pipe(res);
  }

  @Get('devices/:name')
  getDeviceByName(@Param('name') name: string) {
    if (!name || name === '') {
      return this.listDevices();
    }

    return this.appService.getDevice(name);
  }

  @Get('devices')
  listDevices() {
    return this.appService.getDevices();
  }
}
