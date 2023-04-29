import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'freqency'
})
export class FreqencyPipe implements PipeTransform {

  transform(value: string): string {
    let output = "";
    let mhz: string = "";
    let khz: string = "";
    let hz: string = "";
    let arr = value.split(".");
    mhz = arr[0];
    if(arr[1].length === 0){
      khz = arr[1] + "000";
      hz = "000";
    }
    if(arr[1].length === 1){
      khz = arr[1] + "00";
      hz = "000";
    }
    if(arr[1].length === 2){
      khz = arr[1] + "0";
      hz = "000";
    }
    if(arr[1].length === 3){
      khz = arr[1] + "";
      hz = "000";
    }
    if(arr[1].length === 4){
      khz = arr[1][0] + arr[1][1] + arr[1][2] + "";
      hz = arr[1][3] + "00";
    }
    if(arr[1].length === 5){
      khz = arr[1][0] + arr[1][1] + arr[1][2] + "";
      hz = arr[1][3] + arr[1][4] + "0";
    }
    if(arr[1].length === 6){
      khz = arr[1][0] + arr[1][1] + arr[1][2] + "";
      hz = arr[1][3] + arr[1][4] + arr[1][5] + "";
    }
    


   
    return mhz + "." + khz + "." + hz;
  }

}
