import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-group',
  templateUrl: './admin-group.component.html',
  styleUrls: ['./admin-group.component.less']
})
export class AdminGroupComponent implements OnInit {
  private socket: WebSocket;
  public messages: any[];

  constructor() {
    this.socket = new WebSocket('wss://web-socket-server-lab.herokuapp.com/');
    this.messages = [];
    this.socket.onopen = () => {
      this.socket.onmessage = (event) => {
        const model = JSON.parse(event.data);
        if (model.data) {
          const messageType = JSON.parse(model.data).messageType;
          console.log(messageType);
          if(messageType == "vkHook") {
            console.log(JSON.parse(model.data).data);
            this.messages.push(JSON.parse(model.data).data);
          }
        }
      };
    };
   }

  ngOnInit() {
  }

}
