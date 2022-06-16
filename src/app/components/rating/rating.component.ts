import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
  @Input() public rating = 0 as number;
  public ratingPerc = [] as { percent: string; id: string; fill: string }[];

  constructor() {}

  ngOnInit(): void {
    const pos = [1, 2, 3, 4, 5];

    this.ratingPerc = pos.reduce((acc, value) => {
      const remainder = this.rating - value;
      const percent =
        remainder > 0
          ? '100%'
          : remainder > -1
          ? `${(this.rating - (value - 1)) * 100}%`
          : '0%';

      const id = `${this.rating}${value}`;

      acc.push({ percent, id, fill: `url(#${id})` });
      return acc;
    }, [] as { percent: string; id: string; fill: string }[]);

    console.log({ p: this.ratingPerc, r: this.rating });
  }

  getIconName = (starPosition: number) =>
    this.rating >= starPosition
      ? 'star'
      : this.rating >= starPosition - 0.5
      ? 'star_half'
      : '';

  getRating(starPosition: any) {
    console.log(starPosition);
    return starPosition;
  }

  getFill(i: number) {
    return `url(#grad1+${i})`;
  }
}
