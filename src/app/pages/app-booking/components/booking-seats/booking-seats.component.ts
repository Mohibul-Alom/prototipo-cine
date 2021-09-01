import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IapiAuditorium } from 'src/app/models/iapi';
import { IappSession } from 'src/app/models/iapp';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking-seats',
  templateUrl: './booking-seats.component.html',
  styleUrls: ['./booking-seats.component.scss']
})
export class BookingSeatsComponent implements OnInit {

  private selectedOption!:IappSession;
  private auditorium!:IapiAuditorium;


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

    this.getAuditorium(this.selectedOption.id);

  }


  private getAuditorium(id:string):void {

    this.bookingService.getAuditorum(id).subscribe(
      (data: any)=>{
        console.log(data);
      },
      (err: any)=>{
        console.log(err);
      }
    )

  }

}
