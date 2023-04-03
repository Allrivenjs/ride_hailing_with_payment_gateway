//{ customerEmail: string, token: string, initialLocation: { lat1: number, lon1: number, lat2: number, lon2: number }, duraction: {start: Date, end: Date } }
import {
  IsObject,
  IsNumber,
  ValidateNested,
  IsNotEmpty, IsString
} from "class-validator";
import { Type } from "class-transformer";
export interface CreateTravelDtoInterface {
  rider_id: string;
  initialLocation: {
    lat1: string;
    lon1: string;
    lat2: string;
    lon2: string;
  };
}
class LocationDto {
  @IsString()
  lat1: string;

  @IsString()
  lon1: string;

  @IsString()
  lat2: string;

  @IsString()
  lon2: string;
}


export class CreateTravelDto {
    @IsNotEmpty()
    @IsNumber()
    rider_id: string;

    @IsObject()
    @ValidateNested()
    @Type(() => LocationDto)
    initialLocation: LocationDto;

}


