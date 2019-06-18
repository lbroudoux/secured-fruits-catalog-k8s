import { Component, OnInit } from '@angular/core';

import { Fruit } from '../../models/fruit.model';
import { FruitsService } from '../../services/fruits.service';

@Component({
  selector: 'home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css']
})
export class HomePageComponent implements OnInit {

  fruit: Fruit = new Fruit();
  fruits: Fruit[];

  constructor(private fruitsSvc: FruitsService) { }

  ngOnInit() {
    this.getFruits();
  }

  getFruits(): void {
    this.fruitsSvc.getFruits().subscribe(results => this.fruits = results);
  }

  resetFruit(): void {
    this.fruit = new Fruit();
  }
  addFruit(): void {
    this.fruitsSvc.createFruit(this.fruit).subscribe(
      {
        next: res => {
          this.fruit = new Fruit();
          this.getFruits();
        },
        error: err => {
          alert("Fruit cannot be created (" + err.message + ")");
        },
        complete: () => console.log('Observer got a complete notification'),
      }
    );
  }
}
