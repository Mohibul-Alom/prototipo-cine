import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
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
  public sessions: IappSession[] = [];
  public userOptions: IappSession[] = []; //all options available

  public isSessionAvailable: Boolean = false;
  public isSessionSelected:Boolean = false;
  public optionChoosed!: IappSession;

  public today:Date = new Date();
  public nextMonth:Date = new Date(new Date().setDate(this.today.getDate() + 30));

  public minDate!:{ year: number; month: number; day: number};
  public maxDate!:{ year: number; month: number; day: number};

  //ngModel
  public model!: NgbDateStruct;
  public date!: { year: number; month: number; };

  registrationForm = this.formBuilder.group({

  })

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private formBuilder: FormBuilder,
    ) {}


  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.name = params['name'];
    });
    this.getMovies(this.name);    
    this.minDate = {year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() };
    this.maxDate = {year:this.nextMonth.getFullYear(),month: this.nextMonth.getMonth() + 1, day: this.nextMonth.getDate()};
    

  }


  public selectedOption(userSelected:IappSession){

    const {id, day, month, year, hour, minute } = userSelected

    console.log(event);
    this.isSessionSelected = true;

    this.optionChoosed = {
      id,
      day,
      month,
      year,
      hour,
      minute,
    }

  }


  public dateSelected(model:NgbDateStruct) {

    this.userOptions = [];
    this.isSessionSelected = false;

    this.sessions.forEach((session) =>{

      if(session.day === model.day){
        this.userOptions.push(session);
      }

    })
    if(this.userOptions.length !== 0){
      this.isSessionAvailable = true;
    }
  }

  private getMovies(name: string): void {
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

  private getAuditorium(id: string) {
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
        day: dateSession.getDate(),
        month: dateSession.getMonth() + 1,
        year: dateSession.getFullYear(),
        hour: dateSession.getHours().toString(),
        minute: dateSession.getMinutes().toString() === "0" ? "00":dateSession.getMinutes().toString(),
      };

      this.sessions.push(auxAppSession);
      return auxAppSession;
  }

  private sortByDueDate(auxSessions: Date[]):void{
    auxSessions.sort((date1:Date, date2:Date) =>{
        return new Date(date1).getTime() -new Date(date2).getTime();
    })
  }
  
}
