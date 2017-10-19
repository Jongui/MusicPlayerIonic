
export class ClassModel{
  date: Date;
  endDate: Date;
  constructor(public idCours: number, public idClass: number, public classTitle: string, dateString: string){
    this.date = new Date(dateString);
  }
}
