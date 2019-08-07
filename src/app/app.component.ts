import { Component } from '@angular/core';
import { Image } from './common/image';
import { ImageData } from './common/imageData';
import { HttpClient } from '@angular/common/http';
import { DataService } from './services/data.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'ogirdor-carousel';

	RESOURCE_URL = 'https://localhost:44399/api/images';
	images1: Image[];
	images2: Image[];

	constructor(private http: HttpClient, private service: DataService) { }

	ngOnInit() {
		// Get the images
		let obs = this.http.get(this.RESOURCE_URL);
		obs.subscribe((response) => {
			let obj = <ImageData>response;
			if (obj && obj.data) {
				// Generate the random arrays
				this.images1 = this.getRandomArray(obj.data);
				this.images2 = this.getRandomArray(obj.data);
				this.service.changeIndex(0);

				// Check if the arrays are completely different
				if (obj.data.length > 1) {
					for (;!this.isDiffArray(this.images1, this.images2);) {
						this.images2 = this.getRandomArray(obj.data);
					}
				}

			} else {
				// Without images
				this.images1 = [];
				this.images2 = [];
				this.service.changeIndex(-1);
			}
		});
	}

	// Function to generate a random array from another one
	getRandomArray(array: Image[]): Image[] {
		let aux = Array.from(array);
		let result = [];
		for (; aux.length > 0;) {
			let i = Math.floor(Math.random() * aux.length); 
			let k = aux.splice(i, 1);
			result.push(k[0]);
		}
		return result;
	}

	// Function to calculate if 2 arrays are completely different
	isDiffArray(a: Image[], b: Image[]): boolean {
		let result = a.length == b.length;
		for (let i = 0; result && i < a.length; i++) {
			result = result && a[i] != b[i];
		}
		return result;
	}
}
