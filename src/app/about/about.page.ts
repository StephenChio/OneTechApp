import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(private activatedRoute:ActivatedRoute) { }
  version:any;
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((data: any) => {
      this.version = data.version;
    })
  }
}
