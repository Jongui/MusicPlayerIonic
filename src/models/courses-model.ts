
export class CoursModel{
  initDate: Date;
  endDate: Date;
  constructor(public idCours: number, public coursName: string, initDateString: string, endDateString: string,
      public hours: number, public channel: number){
    this.initDate = new Date(initDateString);
    this.endDate = new Date(endDateString);
  }
}
