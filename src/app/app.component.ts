import { Component } from '@angular/core';
import { Evaluate } from './evaluate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'scientificCalculator';
  
  defaultValue: Number = 0;

  constructor() 
  {}

  /* for clicking number buttons */
  numberClick(numOrChar: number | string) {
    const result = document.getElementById('result');
    console.log(result);
    result != null ? (result.innerHTML += numOrChar) : null;
  }

  /* after pressing equals button */
  submit() {
    const expression = document.getElementById('result');
  }
}
