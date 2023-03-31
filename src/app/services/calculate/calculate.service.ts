import {Injectable} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {ray} from "node-ray";


@Injectable()
export class CalculateService {
    private readonly header: object = {
        headers: {
            'Authorization': `${process.env.TOKEN_OPENROUTE_SERVICE}`,
            'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
            'Content-Type': 'application/json; charset=utf-8'
        },
    }
    private dataResponse: {
        distance_in_km: number,
        duration_in_minutes: number,
        origin: string,
        destination: string,
        date?: Date
    } = {
        distance_in_km: 0,
        duration_in_minutes: 0,
        origin: "",
        destination: "",
    };
    constructor(private readonly httpService: HttpService) {}
    calculateAmount(): number {
        const {distance_in_km, duration_in_minutes} = this.dataResponse;
        const baseFee = 3500; // COP $3500 cuota base
        const distanceFee = distance_in_km * 1000; // COP $1000 por cada km
        const durationFee = duration_in_minutes * 200; // COP $200 por cada minuto transcurrido
        return baseFee + distanceFee + durationFee;
    }

    getResultResponse(): object {
        return this.dataResponse;
    }

    persistenInformation(): void {


    }

    async getTimeDurationAndDistance(lat1: number, lon1: number, lat2: number, lon2: number): Promise<this> {
        const { data } = await this.httpService.axiosRef.post(`https://api.openrouteservice.org/v2/matrix/driving-car`,
          `{"locations":[[${lat1},${lon1}],[${lat2},${lon2}]],"metrics":["distance","duration"],"resolve_locations":"true","units":"km"}`, this.header);
        this.dataResponse = {
            distance_in_km: data.distances[0][1],
            duration_in_minutes: data.durations[0][1] / 60,
            origin: data.destinations[0],
            destination: data.destinations[1],
            date: new Date()
        };
        return this;
    }



}
