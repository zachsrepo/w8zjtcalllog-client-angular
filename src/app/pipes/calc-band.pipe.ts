import { Pipe, PipeTransform } from '@angular/core';
import { FreqencyPipe } from './freqency.pipe';

@Pipe({
  name: 'calcBand'
})
export class CalcBandPipe implements PipeTransform {

  freqpipe = new FreqencyPipe;
  band: number = 0;

  transform(frequency: string): number {

    let newfreq = this.freqpipe.transform(frequency);
    let arr = newfreq.split(".");
    let freq = Number(arr[0] + "." + arr[1]);
    if(freq === 0)
    {
        this.band = 0;
    }
    else if(freq >= 1.8 && freq <= 2.0)
    {
        this.band = 160;
    }
    else if(freq >= 3.5 && freq <= 4.0)
    {
        this.band = 80;
    }
    else if(freq === 5.3305 || freq === 5.332 || freq === 5.3465 || freq === 5.348 || freq === 5.357 || freq === 5.3585 || freq === 5.3715 || freq === 5.373 || freq === 5.4035 || freq === 5.405){
        this.band = 60;
    }
    else if(freq >= 7.0 && freq <= 7.3)
    {
        this.band = 40;
    }
    else if(freq >= 10.1 && freq <= 10.15)
    {
        this.band = 30;
    }
    else if(freq >= 14.0 && freq <= 14.35)
    {
        this.band = 20;
    }
    else if(freq >= 18.068 && freq <= 18.168)
    {
        this.band = 17;
    }
    else if(freq >= 21 && freq <= 21.45)
    {
        this.band = 15;
    }
    else if(freq >= 24.89 && freq <= 24.99)
    {
        this.band = 12;
    }
    else if(freq >= 28.0 && freq <= 29.7)
    {
        this.band = 10;
    }
    else if( freq >= 50 && freq <= 54)
    {
        this.band = 6;
    }
    else if( freq >= 144 && freq <= 148)
    {
        this.band = 2;
    }
    else{
        this.band = 0;
    }
    return this.band;
  }

}
