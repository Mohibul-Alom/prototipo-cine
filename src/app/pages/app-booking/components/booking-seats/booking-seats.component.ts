import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IapiAuditorium, IapiSeat, IapiSessions } from 'src/app/models/iapi';
import { IappSession } from 'src/app/models/iapp';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking-seats',
  templateUrl: './booking-seats.component.html',
  styleUrls: ['./booking-seats.component.scss']
})
export class BookingSeatsComponent implements OnInit {

  private selectedOption!:IappSession;
  
  public session!:IapiSessions;

  public seatRows:Array<any>[]=[];


  Arr = Array; //Array type captured in a variable
  num:number = 8;

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
  ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params) =>{
      this.selectedOption = {
        id: params['idAuditorium'],
        day:params["day"],
        month:params["month"],
        year:params["year"],
        hour:params["hour"],
        minute: params["minute"],
      }
    })
    this.getSession(this.selectedOption.id);

  }

  private getSession(id:string):void {
      this.bookingService.getSessionById(id).subscribe(
        (data:any) =>{
          this.trasformDataSession(data);
          this.sliceSeats(this.session.seats);
        },
        (err) =>{
          console.log(err);
        }
      )
  }

  private sliceSeats(seats:IapiSeat[]): void {

    this.seatRows[0] = seats.slice(0,8); 
    this.seatRows[1] = seats.slice(8,16); 
    this.seatRows[2] = seats.slice(16,24);
    this.seatRows[3] = seats.slice(24,32);
    this.seatRows[4] = seats.slice(32,40);
    this.seatRows[5] = seats.slice(40,48);
    this.seatRows[6] = seats.slice(48,56);
    this.seatRows[7] = seats.slice(56,64);
    
  }

  private trasformDataSession(data:IapiSessions): void{

    const { _id, date, movie, seats, auditorium } = data;

    this.session = {
      _id, 
      date, 
      movie, 
      seats, 
      auditorium
    }

  }


}
