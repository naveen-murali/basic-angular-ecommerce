import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
  @Input() public rating = 0 as number;

  // CURRENT BASE OF THE RATING IS GETTING FORM THE SERVER
  public currentBase = 5;
  // NEW BASE TO THE RATING TO BE CONVERTED
  public newBase = 5;

  public before = 0;
  public after = 0;

  constructor() {}

  ngOnInit(): void {
    this.rating = this.newBase
      ? (this.rating / this.currentBase) * this.newBase
      : this.rating;

    this.before = Math.floor(this.rating);
    this.after = (this.rating % 1) * 100;
  }

  getRating(position: number) {
    return this.before > position
      ? '100%'
      : this.before === position
      ? `${this.after}%`
      : '0%';
  }

  getStarCounts() {
    return new Array(this.newBase || this.currentBase);
  }

  getFill(i: number) {
    return `url(#${this.getId(i)})`;
  }

  getId(i: number) {
    return `${this.rating}-${i}-ratingGradiant`;
  }
}
