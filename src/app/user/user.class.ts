import { Hamlog } from "../hamlog/hamlog.class";

export class User{
    id: number = 0;
    isAdmin: boolean = false;
    showNetColumn: boolean = false;
    showAddressColumn: boolean = false;
    firstName: string = "";
    lastName: string = "";
    userName: string = "";
    password: string = "";
    callsign: string = "";
    email: string = "";
    address: string = "";
    style: string = "";
    logMode: string = "NORMAL";
    numberOfCallsToShow: number = 50;
    priviousCallsToShow: number = 10;
    defaultMode: string = "LSB";
    lastWorkedMode: string = "";
    lastWorkedPower: number = 0;
    defaultPower: number = 100;
    status: string = "NEW";
    hamLogs!: Hamlog[]
}