import { Hamlog } from "../hamlog/hamlog.class";

export class User{
    id: number = 0;
    isAdmin: boolean = false;
    showNetColumn: boolean = false;
    showAddressColumn: boolean = false;
    showDxSpot: boolean = false;
    filterDxSpots: string = "";
    spotsSortBy: string = "";
    spotsRefreshRate: number = 1000;
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
    recordCount: number = 0;
    status: string = "NEW";
    hamLogs!: Hamlog[]
}