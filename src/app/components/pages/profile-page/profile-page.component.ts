import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { User, Recipe } from '../../../models';
import { ApiService, SessionService } from '../../../utils';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  user: User;
  private _username: string;

  constructor(private route: ActivatedRoute, private api: ApiService, private session: SessionService) {
    console.log(route.snapshot.data)
    this.user = route.snapshot.data['user'];
    console.log(this.user);
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

  deleteRecipe(name: string, id: string) {
    console.log(`Deleting "${name}"`);
    if (prompt(`You are now deleting "${name}". Type in the exact same name as the recipe to continue.`) == name) {
      console.log("Continuing");
      this.api.deleteRecipe(id).subscribe((res) => {
        console.log("Recipe successfully deleted");
        window.location.reload();
      }, (err) => {
        console.log("Error deleting");
        console.error(err.message);
      });
    }else {
      console.log("Cancel");
    }
  }
  onSubmit(commentForm: NgForm) {
    let body = commentForm.value;
    let time = new Date();
    let date = (((time.getMonth()+1) < 10) ? "0" : "") + (time.getMonth()+1) + "/" + ((time.getDate() < 10) ? "0" : "") + time.getDate() + "/" + time.getFullYear();
    body['author'] = this._username;
    body['post'] = date;
    for (let i = 0; i < this.user.comments.length; i++) {
      delete this.user.comments[i]['_id'];
    }
    this.user.comments.push(body);
    console.log(this.user.comments, this.route.snapshot.url[1].path);
    this.api.createComment(this.user.comments, this.route.snapshot.url[1].path).subscribe((res) => {
        console.log("Success!");
    }, (err) => {
      console.log("Error");
      console.error(err.message);
    });
}

}

