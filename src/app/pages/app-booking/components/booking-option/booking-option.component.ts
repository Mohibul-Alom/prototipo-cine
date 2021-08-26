import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Imovie } from 'src/app/models/iapi';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking-option',
  templateUrl: './booking-option.component.html',
  styleUrls: ['./booking-option.component.scss'],
})
export class BookingOptionComponent implements OnInit {
  public name!: string;
  public movieDetail?: Imovie;

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
        console.log("AQUI ESTA TU PUTA PELICULA-->",this.movieDetail)
        this.getAuditorium(this.movieDetail._id);
      },
      (err: any) => {
        console.log(err);
      },
    );
  }

  private transformDataMovie(data: Imovie): Imovie {
    const { _id, title, director, description, duration, image, genere } = data;

    let auxMovie: Imovie = {
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
        console.log("AQUI TIENE TUS PUTAS SALAS-->",data); //TODO: transformar los datos del back
      },
      (err: any)=>{
        console.error(err);
      }
    )

  }




}
