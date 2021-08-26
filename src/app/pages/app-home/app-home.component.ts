import { Component, OnInit } from '@angular/core';
import { Imovie } from 'src/app/models/iapi';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-app-home',
  templateUrl: './app-home.component.html',
  styleUrls: ['./app-home.component.scss']
})
export class AppHomeComponent implements OnInit {

  public myMoviesList?:Imovie[] = [];

  constructor(private globalService:GlobalService) { }

  ngOnInit(): void {
    this.getMoviesList();
  }

  public getMoviesList():void {
    this.globalService.getMovies().subscribe(
      (data:any)=>{
      
        data.forEach((element:Imovie)=>{

          let auxMovie:Imovie = this.transformData(element);
          this.myMoviesList?.push(auxMovie);
        })
      },
      (err: any)=>{
        console.log(err);
      }
    );
    // console.log("getMovies: ",this.myMoviesList)
  }

  private transformData(data:Imovie):Imovie{

    const {_id,title,director,description,duration,image,genere} = data;

    let auxMovie:Imovie = {
      _id,
      title,
      director,
      description,
      duration,
      image,
      genere,
    }

    return auxMovie;

  }

  public showDefinition(event:any){
    console.log(event.type);
    const id = event.path[0].childNodes[0].id;
    const btn = (document.getElementById(`btn_${id}`) as HTMLElement);

    if(btn != null){
      btn.style.display = event.type === "mouseenter" ? "block" : "none";
    }
    

  }

}
