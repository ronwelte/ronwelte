import { Component, OnInit } from "@angular/core";
import { Input }             from "@angular/core";
import { Image }             from "../../interfaces";

@Component({
  selector: "app-image",
  templateUrl: "./image.component.html",
  styleUrls: ["./image.component.css"]
})
export class ImageComponent implements OnInit {
  @Input() image?: Image;

  constructor() { }

  ngOnInit(): void {
  }

}
