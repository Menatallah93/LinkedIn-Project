import { Component } from '@angular/core';
import { IUser } from '../Shared-Interface/IUser';
import { SearchService } from '../Services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.scss']
})
export class SearchComponentComponent {
  user: IUser[] = [];
  constructor(    private Search: SearchService ,private route :Router
    ){

  }

  onSearchChange(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      const searchText = event.target.value;
      this.Search.Search(searchText).subscribe({
        next: data => this.user = data,
        error: err => console.log(err)
      })
    }
   

  }


  showProfile(user:IUser){
    this.route.navigate(["/profile", user.id]);

  }
}
