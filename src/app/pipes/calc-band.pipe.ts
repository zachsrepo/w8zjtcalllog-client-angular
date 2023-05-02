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
    let freq = Number(arr[0] + "." + arr[1] + arr[2]);
    if(freq === 0)
    {
        this.band = 0;
    }
    else if(freq >= 1.8000 && freq <= 2.0000)
    {
        this.band = 160;
    }
    else if(freq >= 3.5000 && freq <= 4.0000)
    {
        this.band = 80;
    }
    else if(freq === 5.3305 || freq === 5.3320 || freq === 5.3465 || freq === 5.3480 || freq === 5.3570 || freq === 5.3585 || freq === 5.3715 || freq === 5.3730 || freq === 5.4035 || freq === 5.405){
        this.band = 60;
    }
    else if(freq >= 7.0000 && freq <= 7.3000)
    {
        this.band = 40;
    }
    else if(freq >= 10.1000 && freq <= 10.1500)
    {
        this.band = 30;
    }
    else if(freq >= 14.0000 && freq <= 14.3500)
    {
        this.band = 20;
    }
    else if(freq >= 18.0680 && freq <= 18.1680)
    {
        this.band = 17;
    }
    else if(freq >= 21.0000 && freq <= 21.4500)
    {
        this.band = 15;
    }
    else if(freq >= 24.8900 && freq <= 24.9900)
    {
        this.band = 12;
    }
    else if(freq >= 28.0000 && freq <= 29.7000)
    {
        this.band = 10;
    }
    else if( freq >= 50.0000 && freq <= 54.0000)
    {
        this.band = 6;
    }
    else if( freq >= 144.0000 && freq <= 148.0000)
    {
        this.band = 2;
    }
    else{
        this.band = 0;
    }
    return this.band;
  }

}
