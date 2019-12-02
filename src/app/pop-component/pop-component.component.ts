import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Popover } from '../Common/popover';

@Component({
  selector: 'app-pop-component',
  templateUrl: './pop-component.component.html',
  styleUrls: ['./pop-component.component.scss'],
})
export class PopComponentComponent implements OnInit {

  constructor(private popover:Popover,private router: Router) { }

  ngOnInit() { }
  addFriendPage() {
    this.popover.dismiss();
    this.router.navigate(['/add-friend-page'])
  }
}
