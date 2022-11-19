import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CustomFile } from 'src/models/CustomFile';

@Injectable({
  providedIn: 'root'
})
export class CustomFileHandlerService {

  constructor(private sanitizer: DomSanitizer) { }

  getSrcFromCustomFile(customFile : CustomFile) {
    let uint8Array = new Uint8Array(atob(customFile.data).split("").map(char => char.charCodeAt(0)));
    let dwn = new Blob([uint8Array]);
    return this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(dwn));
  }
}
