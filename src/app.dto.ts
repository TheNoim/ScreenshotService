import {
  IsBoolean,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class OverlayOptions {
  @IsOptional()
  @IsIn(['safari-light', 'safari-dark'])
  browser?: 'safari-light' | 'safari-dark';

  @IsOptional()
  @IsString()
  background?: string;
}

// tslint:disable-next-line:max-classes-per-file
export class Viewport {
  @IsNumber()
  @Min(1)
  @Max(3840)
  width: number;

  @IsNumber()
  @Min(1)
  @Max(3840)
  height: number;

  @IsOptional()
  @IsNumber()
  @Min(0.1)
  @Max(3)
  deviceScaleFactor?: number;

  @IsOptional()
  @IsBoolean()
  isMobile?: boolean;

  @IsOptional()
  @IsBoolean()
  hasTouch?: boolean;

  @IsOptional()
  @IsBoolean()
  isLandscape?: boolean;
}

type waitUntil = 'load' | 'domcontentloaded' | 'networkidle0' | 'networkidle2';

// tslint:disable-next-line:max-classes-per-file
export class ScreenshotParams {
  @IsUrl()
  url: string;

  @IsOptional()
  @IsUrl({}, { each: true })
  styles?: string[];

  @IsOptional()
  @IsString()
  @Length(1, 256)
  scrollTo?: string;

  @IsOptional()
  @IsString({ each: true })
  hide?: string[];

  @IsOptional()
  @IsBoolean()
  disableAnimations?: boolean = true;

  @ValidateNested()
  @IsOptional()
  @Type(type => OverlayOptions)
  overlay?: OverlayOptions;

  @ValidateNested()
  @IsOptional()
  @Type(type => Viewport)
  viewport?: Viewport;

  @IsOptional()
  @IsNumber()
  @Max(4000)
  @Min(0)
  waitFor?: number;

  @IsOptional()
  @IsIn(['load', 'domcontentloaded', 'networkidle0', 'networkidle2'], {
    each: true,
  })
  waitUntil?: waitUntil[];

  @IsOptional()
  @IsString()
  @Length(1, 256)
  device?: string;
}
