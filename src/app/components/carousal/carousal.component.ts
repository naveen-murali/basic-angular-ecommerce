import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarousalDataModal } from 'src/app/models/carousal.modal';
import { CarousalService } from 'src/app/services/carousal/carousal.service';

@Component({
  selector: 'app-carousal',
  templateUrl: './carousal.component.html',
  styleUrls: ['./carousal.component.scss'],
})
export class CarousalComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['Prev', 'Next'],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: true,
  };
  public carousalData = [] as CarousalDataModal[];

  constructor(private readonly _carousalService: CarousalService) {}

  ngOnInit(): void {
    this._carousalService.carousalData.subscribe(
      (data) => (this.carousalData = data)
    );
  }
}
