import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IapiMovie } from 'src/app/models/iapi';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking-option',
  templateUrl: './booking-option.component.html',
  styleUrls: ['./booking-option.component.scss'],
})
export class BookingOptionComponent implements OnInit {
  public name!: string;
  public movieDetail?: IapiMovie;

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

  public getMovies(name: string):void {
    this.bookingService.getMoviesByName(name).subscribe(
      (data: any) => {
        this.movieDetail = this.transformDataMovie(data[0]);
        console.log("linea 33-->",this.movieDetail)
        this.getAuditorium(this.movieDetail._id);
      },
      (err: any) => {
        console.log(err);
      },
    );
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


  public getAuditorium(id: string){

    this.bookingService.getAuditoriumByMovieId(id).subscribe(
      (data: any)=>{
        console.log("Linea 63-->",data); //TODO: transformar los datos del back
      },
      (err: any)=>{
        console.error(err);
      }
    )

  }




}
