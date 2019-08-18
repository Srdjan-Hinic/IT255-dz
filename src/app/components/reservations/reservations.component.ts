import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  size;
  
  private rooms = [
    { size: 45, beds: 2, seaView: 0, available: "yes" },
    { size: 35, beds: 3, seaView: 1 },
    { size: 55, beds: 5, seaView: 1 },
  ]
  private filteredResults = [
    { size: 45, beds: 2, seaView: 0, available: "yes" },
    { size: 35, beds: 3, seaView: 1 },
    { size: 55, beds: 5, seaView: 1 },
  ]
  
  constructor() { }

  ngOnInit() {

  }




}
