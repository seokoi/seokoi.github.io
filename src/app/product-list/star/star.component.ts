import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-star',
  standalone: true,
  imports: [],
  templateUrl: './star.component.html',
  styleUrl: './star.component.css'
})
export class StarComponent implements OnInit{
  @Input() rating: number
  @Output() outRating= new EventEmitter<string>()
  starWidth: number
  constructor(){
    this.rating=0
    this.starWidth=(this.rating*90)/5
  }
  ngOnInit(): void {
      this.starWidth=(this.rating*90)/5
  }
  viewRating(){
    this.outRating.emit(`Đánh giá sản phẩm: ${this.rating}`)
  }
}
