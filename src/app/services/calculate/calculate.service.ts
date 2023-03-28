import {Injectable} from '@nestjs/common';

@Injectable()
export class CalculateService {
    calculateAmount(distance: number, duration: number): number {
        const baseFee = 3500; // COP $3500 cuota base
        const distanceFee = distance * 1000; // COP $1000 por cada km
        const durationFee = duration * 200; // COP $200 por cada minuto transcurrido

        return baseFee + distanceFee + durationFee;
    }

    calculateDuration(start: Date, end: Date): number {
        const durationMs = end.getTime() - start.getTime();
        return Math.round(durationMs / (1000 * 60)); //durationMin
    }

    toRad(x: number): number {
        return x * Math.PI / 180;
    }
    calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371; // radio de la Tierra en km
        const dLat = this.toRad(lat2 - lat1);
        const dLon = this.toRad(lon2 - lon1);
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const d = R * c; // distancia en km
        return d;
    }



}
