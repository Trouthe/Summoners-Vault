import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  loading: boolean = true;

  constructor() { }

  getLoading (): boolean {return this.loading}
  setLoading (isLoading: boolean): void {this.loading = isLoading}
}
