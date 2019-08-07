import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Image } from '../common/image';
import { DataService } from '../services/data.service';

@Component({
	selector: 'app-carousel',
	templateUrl: './carousel.component.html',
	styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

	// Carousel container
	@ViewChild('elemImages', { static: false }) elemImages: ElementRef;

	private _images: Image[];

	get images(): Image[] {
		return this._images;
	}

	@Input()
	set images(images: Image[]) {
		this._images = images;
		// Setup of control
		this.startCarousel();
	}

	@Input() isBig: boolean;

	commonIndex: number;
	selectedImage: Image;
	selectedIdex: number;
	interval: any;
	intervalMs: number = 5000;

	constructor(private service: DataService) { }

	ngOnInit() {
		// Common index between carousels (to prevent show the same image at the same time)
		this.service.currentIndex.subscribe(index => {
			this.commonIndex = index;
			if (this.images && this.images.length > 0 && index > -1 && index < this.images.length) {
				// Image for the common index
				this.selectedIdex = index;
				this.selectedImage = this.images[index];
				this.goImage();

			} else {
				// Without images
				this.selectedIdex = -1;
				this.selectedImage = null;
			}
		});
		// Setup of control
		this.startCarousel();
		// Setup of timer to change between images
		this.interval = setInterval(() => {
			this.goNext();
		}, this.intervalMs);
	}

	// Setup of control
	startCarousel() {
		if (this.images && this.images.length > 0) {
			// First image
			this.selectedIdex = 0;
			this.selectedImage = this.images[0];
		} else {
			// Without images
			this.selectedIdex = -1;
			this.selectedImage = null;
		}
	}

	// Go to the specific image
	selectImage(image: Image) {
		this.service.changeIndex(this.images.findIndex(record => record === image));
	}

	// Go to the next image
	goNext() {
		if (this.images && this.images.length > 0) {
			this.selectedIdex = (this.selectedIdex + 1) % this.images.length;
			this.selectedImage = this.images[this.selectedIdex];
			this.goImage();
		}
	}

	// Go to the previous image
	goBack() {
		if (this.images && this.images.length > 0) {
			this.selectedIdex = (this.selectedIdex + this.images.length - 1) % this.images.length;
			this.selectedImage = this.images[this.selectedIdex];
			this.goImage();
		}
	}

	// Update control
	goImage() {
		let children = this.elemImages.nativeElement.children;
		let offset = 0;
		// Offset calculation
		for (let i = 0; i < this.selectedIdex && i < children.length; i++) {
			offset += children[i].offsetWidth;
		}
		// Update of element
		this.elemImages.nativeElement.style.marginLeft = '-' + offset + 'px';
	}
}
