import { Component } from '@angular/core';
import { SignalRsService } from './Services/SignalR.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angylar-Project';
  constructor(public signalRService: SignalRsService){

  }

  ngOnInit(){
    
  }
}
