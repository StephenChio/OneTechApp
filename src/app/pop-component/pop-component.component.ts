import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pop-component',
  templateUrl: './pop-component.component.html',
  styleUrls: ['./pop-component.component.scss'],
})
export class PopComponentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }
  addFriendPage() {
    this.router.navigate(['/add-friend-page'])
  }
}
