import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { IapiAuditorium, IapiMovie } from 'src/app/models/iapi';
import { IappAuditorium, IappSession } from 'src/app/models/iapp';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking-option',
  templateUrl: './booking-option.component.html',
  styleUrls: ['./booking-option.component.scss'],
})

export class BookingOptionComponent implements OnInit {

  public name!: string;
  public movieDetail?: IapiMovie;
  public auditoriums: IappAuditorium[] = [];

  public today:Date = new Date();
  public nextMonth:Date = new Date(new Date().setDate(this.today.getDate() + 30));

  public minDate!:{ year: number; month: number; day: number};
  public maxDate!:{ year: number; month: number; day: number};

  public model!: NgbDateStruct;
  public date!: { year: number; month: number; };

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
    ) {}


  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.name = params['name'];
    });
    this.getMovies(this.name);    
    this.minDate = {year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() };
    this.maxDate = {year:this.nextMonth.getFullYear(),month: this.nextMonth.getMonth() + 1, day: this.nextMonth.getDate()};
  }

  dateSelected(model:any) {
    console.log(model);
  }

  public getMovies(name: string): void {
    this.bookingService.getMoviesByName(name).subscribe(
      (data: any) => {
        this.movieDetail = this.transformDataMovie(data[0]);
        this.getAuditorium(this.movieDetail._id);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  public getAuditorium(id: string) {
    this.bookingService.getAuditoriumByMovieId(id).subscribe(
      (data: any) => {
        this.transformDataAuditorium(data);
        console.log(this.auditoriums);
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  private transformDataAuditorium(data: IapiAuditorium[]) {


    data.forEach((auditorium: IapiAuditorium) => {
      const { _id, name, capacity, sessions, movie, seats } = auditorium;

      this.sortByDueDate(sessions);

      let auxSessions: IappSession[] = [];

      sessions.forEach((session: Date) => {

        let auxSession = this.trasformDate(session, auditorium._id)
        auxSessions.push(auxSession);

      });
      console.log("auxsessions-->",auxSessions);

      let auxAuditorium: IappAuditorium = {
        _id,
        name,
        capacity,
        sessions: auxSessions,
        movie,
        seats,
      };
      
      if(auxAuditorium.sessions !== null){
        this.auditoriums.push(auxAuditorium);
      }

    });
  }

  private transformDataMovie(data: IapiMovie): IapiMovie {
    const { _id, title, director, description, duration, image, genere } = data;

    let auxMovie: IapiMovie = {
      _id,
      title,
      director,
      description,
      duration,
      image,
      genere,
    };
    return auxMovie;
  }

  private trasformDate(data: Date, id: string): IappSession{
    let auxAppSession: IappSession;

    let dateSession = new Date(data);
      auxAppSession = {
        id,
        day: dateSession.getDate().toString(),
        month: `${dateSession.getMonth()+1}`,
        hour: dateSession.getHours().toString(),
        minute: dateSession.getMinutes().toString(),
      };
  
      return auxAppSession;
  }

  private sortByDueDate(auxSessions: Date[]):void{
    auxSessions.sort((date1:Date, date2:Date) =>{
        return new Date(date1).getTime() -new Date(date2).getTime();
    })
  }
  
}
