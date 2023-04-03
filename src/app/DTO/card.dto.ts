import { IsNotEmpty, IsNumber, IsObject, Max, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";


class cardDto {
    @IsNotEmpty()
    number: string;
    @IsNotEmpty()
    exp_month: string;
    @IsNotEmpty()
    exp_year: string;
    @IsNotEmpty()
    @Min(3)
    @Max(3)
    cvc: string;
    @IsNotEmpty()
    card_holder: string;
}
export class CardDto {
    @IsNotEmpty()
    @IsNumber()
    rider_id: number;

    @IsObject()
    @ValidateNested()
    @Type(() => cardDto)
    card: cardDto;
}
export class getRiderDTO {
    @IsNotEmpty()
    @IsNumber()
    rider_id: number;
}
export class paymentSourceDto {
    @IsNotEmpty()
    @IsNumber()
    travel_id: number;

    @IsNotEmpty()
    @IsNumber()
    card_id: number;

    @IsNotEmpty()
    @IsNumber()
    installment: number;

}