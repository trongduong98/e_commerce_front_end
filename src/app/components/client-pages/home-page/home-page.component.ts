import { Component, OnInit } from '@angular/core';
// @ts-ignore
import AOS from 'aos'; //AOS - 1

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public year: number =  new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
    AOS.init();
    AOS.refresh();
  }

}
