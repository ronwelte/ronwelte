import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})
export class IntroductionComponent implements OnInit {

  isIntroOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleOpenClosed() {
    this.isIntroOpen = !this.isIntroOpen;
  }
}
