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
          '--disable-notifications',
          '--disable-offer-store-unmasked-wallet-cards',
          '--disable-offer-upload-credit-cards',
          '--disable-setuid-sandbox',
          '--enable-async-dns',
          '--enable-simple-cache-backend',
          '--enable-tcp-fast-open',
          '--media-cache-size=33554432',
          '--no-default-browser-check',
          '--no-pings',
          '--no-sandbox',
          '--no-zygote',
          '--prerender-from-omnibox=disabled',
          '--disable-dev-shm-usage',
          '--headless',
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
    const buffer: Buffer = await this.browserless.screenshot(url, {
      ...browserlessOptions,
      adblock: false,
    });
    const stream = new Readable();

    stream.push(buffer);
    stream.push(null);

    return [stream, buffer.length];
  }

  public getDevices(): any[] {
    return this.browserless.devices;
  }

  public getDevice(name: string) {
    return this.getDevices().reduce((lastValue, value) => {
      if (lastValue !== false) {
        return lastValue;
      }
      if (value.name === name) {
        return value;
      }
      return false;
    }, false);
  }
}
