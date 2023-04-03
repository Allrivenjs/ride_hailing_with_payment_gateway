//{ customerEmail: string, token: string, initialLocation: { lat1: number, lon1: number, lat2: number, lon2: number }, duraction: {start: Date, end: Date } }
import {
  IsObject,
  IsNumber,
  ValidateNested,
  IsNotEmpty
} from "class-validator";
import { Type } from "class-transformer";
export interface CreateTravelDtoInterface {
  rider_id: string;
  initialLocation: {
    lat1: number;
    lon1: number;
    lat2: number;
    lon2: number;
  };
}
class LocationDto {
  @IsNumber()
  lat1: number;

  @IsNumber()
  lon1: number;

  @IsNumber()
  lat2: number;

  @IsNumber()
  lon2: number;
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


