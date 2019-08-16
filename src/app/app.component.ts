import { Component } from '@angular/core';
import { NestoComponent } from './nesto.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'met-hotels';
  niz = [
    new NestoComponent(1, "Marko"),
    new NestoComponent(2, "Srdjan"),
    new NestoComponent(3, "Stefan")
  ]
}
