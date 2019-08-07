import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
	providedIn: 'root'
})
export class DataService {

	private commonIndex = new BehaviorSubject<number>(-1);
	currentIndex = this.commonIndex.asObservable();

	constructor() { }

	changeIndex(index: number) {
		this.commonIndex.next(index);
	}
}
