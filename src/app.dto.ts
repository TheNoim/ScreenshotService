import {
  IsBoolean,
  IsIn,
  IsOptional,
  IsString,
  IsUrl,
  Length,
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
}
