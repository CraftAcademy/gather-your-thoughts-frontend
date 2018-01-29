import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { ThoughtsProvider } from '../../providers/thoughts/thoughts';


@IonicPage()
@Component({
  selector: 'page-thought_modal',
  templateUrl: 'thought_modal.html',
})

export class ThoughtModalPage {
  thought = {}
  constructor(private view: ViewController,
              public thoughtsProvider: ThoughtsProvider) {
  }

  closeModal() {
    this.view.dismiss();
  }

  ionViewDidLoad() {
  }

  createThought() {
    this.thoughtsProvider.saveThought(this.thought)
    .subscribe(data => console.log(data),
              data => console.log(data))
  }

}
