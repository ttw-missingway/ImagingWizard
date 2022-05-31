import { Component, OnInit } from '@angular/core';
import * as JSZip from 'jszip'; 
import * as FileSaver from 'file-saver'
import { Roster } from 'src/app/services/roster.service';
import { ICharacter } from 'src/app/shared/character';
import { HttpHeaders } from '@angular/common/http';

const JSZipUtils = require('jszip-utils');

@Component({
  selector: 'app-filedownloaderclient',
  templateUrl: 'filedownloaderclient.component.html',
})
export class FiledownloaderclientComponent implements OnInit {
  characters: ICharacter[] | undefined;
  errorMessage: string = "error!";
  imageWidth: number = 20;
  imageMargin: number = 2;

  constructor(public roster: Roster) { }

  ngOnInit(): void {
    this.roster.getCharacters()
            .subscribe({
                next: characters => {
                    this.characters = characters;
                }, 
                error: err => this.errorMessage = err
            });
  }

  downloadZip(){
    var zip = new JSZip();

    var imgFolder = zip.folder("images");

    var totalCount = 0;
    Array.prototype.forEach.call(this.characters, char => {
      Array.prototype.forEach.call(char.pics, pic => {
        totalCount ++;
      })
    })

    Array.prototype.forEach.call(this.characters, char => {
      console.log(char.handle + " is down the zip line!");
      let count = 0;
      Array.prototype.forEach.call(char.pics, pic => {

        JSZipUtils.getBinaryContent(pic, function (err:any, data:any) {
          if (err) {
            console.log("ERROR ERROR");
            throw err;
          }
          console.log(pic + " picture is down the zip line");
          imgFolder?.file("image_" + count + ".png", data, { binary: true });
          count++;

          if (count === totalCount){
            zip.generateAsync({ type: "blob" })
            .then(function (content) {
              FileSaver.saveAs(content, "Images.zip");
            });
          }
        });
        // console.log(pic + " picture is down the zip line");
        // imgFolder?.file("file_" + count + ".png", pic, {base64: true});
        // count++;
      });
    });

    
  }
}
