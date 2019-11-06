import { Injectable, OnModuleInit } from '@nestjs/common';
import { ScreenshotParams } from './app.dto';
import Browserless = require('browserless');
import { Readable } from 'stream';

@Injectable()
export class AppService implements OnModuleInit {
  private browserless;

  onModuleInit() {
    this.setUpBrowserless();
  }

  private setUpBrowserless() {
    if (process.env.DOCKER) {
      this.browserless = Browserless({
        executablePath: '/usr/bin/chromium-browser',
        args: [
          '--disable-dev-shm-usage',
          '--no-sandbox',
          '--headless',
          '--disable-gpu',
        ],
      });
    } else {
      this.browserless = Browserless();
    }
  }

  public async createScreenshot(
    params: ScreenshotParams,
  ): Promise<[Readable, number]> {
    const { url, ...browserlessOptions } = params;
    const buffer: Buffer = await this.browserless.screenshot(
      url,
      browserlessOptions,
    );
    const stream = new Readable();

    stream.push(buffer);
    stream.push(null);

    return [stream, buffer.length];
  }
}
