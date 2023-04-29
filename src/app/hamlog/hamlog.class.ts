import { DatePipe } from "@angular/common";
import { User } from "../user/user.class";

export class Hamlog {
    id: number = 0;
    userId: number = 0;
    // user!: User;
    fccId: string = "";
    callsign: string = "";
    altCallsign: string = "";
    callModifier: string = "";
    reciprical: string = "";
    frequency: string = "";
    mode: string = "";
    rsTsent: string = "59";
    rsTrec: string = "59";
    band: number = 0;
    power: number = 0;
    firstName: string = "";
    lastName: string = "";
    fullName: string = "";
    country: string = "United States";
    city: string = "";
    state: string = "";
    postalCode: string = "";
    address: string = "";
    comments: string = "";
    qth: string = "";
    logCount: number = 0;
    dateAndTime: string | null = null;
    timeOff: string | null = null;

}