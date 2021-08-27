import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.name = params['name'];
    });

    this.getMovies(this.name);
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
        this.transformDataAuditorium(data); //TODO: front del auditorium
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

      let auxSessions: IappSession[] | null = [];

      sessions.forEach((session: Date, index: number) => {

        let auxSession = this.trasformDate(session, index)

        if(auxSession !== null){
          auxSessions?.push(auxSession);
        }

      });

      if(auxSessions.length === 0){
        auxSessions = null;
      }

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

  private trasformDate(data: Date, index: number): IappSession | null{
    let auxAppSession: IappSession;

    let dateSession = new Date(data);

    let today = new Date();

    if (today > dateSession) {
      return null;
    } else {
      auxAppSession = {
        position: index,
        day: dateSession.getDate().toString(),
        month: `${dateSession.getMonth()+1}`,
        hour: dateSession.getHours().toString(),
        minute: dateSession.getMinutes().toString(),
      };
  
      return auxAppSession;
    }

  }
}
