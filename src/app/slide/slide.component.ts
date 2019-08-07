import { Component, OnInit, Input } from '@angular/core';
import { Image } from '../common/image';

@Component({
	selector: 'app-slide',
	templateUrl: './slide.component.html',
	styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {

	@Input() image: Image;
	@Input() isBig: boolean;

	constructor() { }

	ngOnInit() { }
}
