import { Component, OnInit } from "@angular/core";
import { Input }             from "@angular/core";
import { Location }          from "../../interfaces";

@Component({
  selector: "app-location",
  templateUrl: "./location.component.html",
  styleUrls: ["./location.component.css"]
})
export class LocationComponent implements OnInit {
  @Input() location?: Location;

  constructor() { }

  ngOnInit(): void {
  }

}
