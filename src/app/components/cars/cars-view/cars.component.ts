import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/car.service';
import { Car } from '../models/car.module';
import { AdminDropboxService } from '../../admin/services/admin-load.service';
import { debounce, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.less'],
  providers: [CarService, AdminDropboxService]
})
export class CarsComponent implements OnInit {

  private socket: WebSocket;
  cars: Car[];
  searchQuery: string;
  queryChanged = new Subject<string>();

  constructor(
    private carService: CarService,
    public adminService: AdminDropboxService,    
    ) { 
      this.socket = new WebSocket('wss://web-socket-server-lab.herokuapp.com/');
      this.cars  = [];
      this.socket.onopen = () => {
        this.socket.onmessage = (event) => {
          console.log(event.data);
          const model = JSON.parse(event.data);
          if(model.data) {
            const messageType = JSON.parse(model.data).messageType;
            console.log(messageType);
            if(messageType == "data") {
              console.log(JSON.parse(model.data).cars);
              this.cars = JSON.parse(model.data).cars;
            }
          }
        }
      }
    }

  ngOnInit() {
    this.carService.getData().subscribe(data => this.cars=data);

    this.queryChanged.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(q => this.carService.search(q).subscribe(val => this.cars = val));
  }

  check(name: string) {
    return name;
  }

  changed(query: string) {
    if (query.trim() === '') {
      return;
    }
    this.queryChanged.next(query);
  }
}
