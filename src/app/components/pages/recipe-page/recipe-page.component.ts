import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm  } from '@angular/forms';

import { Recipe } from '../../../models'
import { ApiService, SessionService } from '../../../utils';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.css']
})
export class RecipePageComponent implements OnInit {
  recipe: Recipe
  private _username: string;

  constructor(private route: ActivatedRoute, private api: ApiService, private session: SessionService) {
    this.recipe = new Recipe();
    
    let routeData = route.data.subscribe((data) => {
        this.recipe = data['recipe'];
    });
  }

  ngOnInit() {
    this.session.signedIn$.subscribe((user) => {
      console.log(user);
      if (user) {
        this._username = user.username;
      } else {
        this._username = '';
      }
    });
  }

  submitRating(form: NgForm) {
    let body = parseInt(form.value.star);
    let current = this.recipe.rating['average'] * this.recipe.rating['quantity'];
    this.recipe.rating['quantity']++;
    this.recipe.rating['average'] = Math.round((current + body) / this.recipe.rating['quantity'] * 100)/100;
    console.log(this.recipe.rating);
    this.api.createRating(this.recipe.rating, this.route.snapshot.url[1].path).subscribe((res) => {
        console.log("Rating submitted successfully");
    }, (err) => {
        console.log("Error");
        console.error(err.message);
    });
  }

}
