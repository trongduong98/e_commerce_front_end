import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public isPage: BehaviorSubject<number> = new BehaviorSubject<number>(1);
    constructor() { }
}
