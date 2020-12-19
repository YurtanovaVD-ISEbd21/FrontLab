import { Component, OnInit } from '@angular/core';
import { AdminDropboxService } from '../../services/admin-load.service';
import { File } from '../../models/file.model';

import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-files',
  templateUrl: './admin-files.component.html',
  styleUrls: ['./admin-files.component.less'],
  providers: [ AdminDropboxService ]
})
export class AdminFilesComponent implements OnInit {

  folderInfo: File[];

  constructor(private router: Router, private adminDropboxService: AdminDropboxService) { }

  ngOnInit() {
    this.adminDropboxService.folderInfo(data => {
      console.log('get file list', data);
      this.folderInfo=data;
    });
  }
  
  download(name: string) {
    this.adminDropboxService.download(name);
  }

  upload(fileInput: any) {
    const file = fileInput.target.files[0];
    this.adminDropboxService.upload(file);
  }
}
