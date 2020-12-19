import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dropbox } from 'dropbox';
import { DomSanitizer } from '@angular/platform-browser';
import { File } from '../models/file.model';
import { Response } from 'selenium-webdriver/http';

@Injectable()
export class AdminDropboxService{  
  constructor(private http: HttpClient, private sanitizer : DomSanitizer){ }

  getImage(model: String) {
    const accessToken  = 'LcWjlZQRcfAAAAAAAAAAEaC6QskZ0EcAnInodKY5oZGdeZRCJAF4nPYwjI1nZ_OO';

    const dbx = new Dropbox({  
      accessToken,  
      fetch  
    });

    console.log(model);

    dbx.filesDownload({  
      path: `/${model}.jpeg`
    }).then(response => {
      console.log(response);
     })
  }

  header = new HttpHeaders({
    //'Content-Type': 'application/json',
    'Dropbox-API-Arg': '{\"path\": \"/comm.txt\"}',
    // 'Dropbox-API-Arg': '{"path":"/Реново.jpeg"}',
    'Authorization': 'Bearer LcWjlZQRcfAAAAAAAAAAEaC6QskZ0EcAnInodKY5oZGdeZRCJAF4nPYwjI1nZ_OO'
  }

  )

  upload(file: File) {
    const accessToken  = 'LcWjlZQRcfAAAAAAAAAAFF5zbQ4bgnRiih4KmDE5ssK0y_W_5IskgWeUREqhsyfb';

    const dbx = new Dropbox({  
      accessToken,  
      fetch  
    });

    dbx.filesUpload({
      contents: file,
      path: `/${file.name}`
    }).then(response => console.log(response));
  }

  folderInfo(callback:Function) {
    const accessToken  = 'LcWjlZQRcfAAAAAAAAAAFF5zbQ4bgnRiih4KmDE5ssK0y_W_5IskgWeUREqhsyfb';

    const dbx = new Dropbox({  
      accessToken,  
      fetch  
    });

    dbx.filesListFolder({
      path: ''  
    })
    .then(response =>{
      var result= response.entries.map(item => new File(item.name));
      if(callback){
        callback(result);
      }
    }, error=>{console.log(error)});
  }

  download(fileName: string) {
    const accessToken  = 'LcWjlZQRcfAAAAAAAAAAFF5zbQ4bgnRiih4KmDE5ssK0y_W_5IskgWeUREqhsyfb';

    const dbx = new Dropbox({  
      accessToken,  
      fetch  
    });

    dbx.filesGetTemporaryLink({path: `/${fileName}`})
    .then(function(response) {
	  	var link = document.createElement("a");
      link.href = response.link;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch(function(error) {
      console.log(error);
    });
  }
}