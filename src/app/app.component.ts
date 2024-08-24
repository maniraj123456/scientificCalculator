import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'scientificCalculator';

  symbols: Array<String> = ['sine(','cos(','tan(',]
  
  defaultValue: Number = 0;

  operationsList: Array<any> = [];

  constructor(private apiService: ApiService) { } 

  /* for clicking number buttons */
  numberClick(numOrChar: number | string) {
    const result = document.getElementById('result');
    (result != null && result.innerText !== "0") ? (result.innerHTML += numOrChar) : null;
    (result != null && result.innerText === "0") ? (result.innerHTML = numOrChar+"") : null;
  }

  /* after pressing equals button */
  submit() {
    const expression = document.getElementById('result')?.innerText;
    if(expression)
    {
        this.postData(expression);
    }
  }

  backSpace()
  {
    const result = document.getElementById('result');
    let resultVal : string | undefined = result?.innerText;
    let  trigonometric = resultVal?.substring((resultVal.length - 4),  resultVal.length);
    (resultVal != undefined && resultVal.length >= 4 && result && (trigonometric === "sin(" || trigonometric === "cos(" || trigonometric === "tan(") ) ? result.innerHTML  = resultVal.substring(0, resultVal.length - 4) : null;
    (!(trigonometric === "sin(" || trigonometric === "cos(" || trigonometric === "tan(") && resultVal != undefined && resultVal.length > 0 && resultVal !== "0" && result ) ? result.innerHTML  = resultVal.substring(0, resultVal.length - 1) : null;
  }

  openHistory()
  {
    if(this.operationsList.length === 0)
      this.getData();
    else
      this.operationsList = []; 
  }

  private postData(expression:string) {
    /* replacing X with '*' */
    expression = expression.replaceAll('X','*');
    /* calling api */
    const payload = { 'expression' : expression };
    this.apiService.postData(payload).subscribe(
      (response) => {
        const result = document.getElementById('result');
        (result != null)? result.innerText = response : console.log(response);
      },
      (error) => {
        console.error('Error posting data', error);
      }
    );
  }

  private getData()
  {
    this.apiService.getData().subscribe(
      (response)=>{
        this.operationsList = response;
        console.log(response);
      },
      (error)=>{
        console.log(error);
      }
    );
  }
}
