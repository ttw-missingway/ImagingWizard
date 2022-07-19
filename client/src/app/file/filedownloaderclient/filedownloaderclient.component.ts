import { Component, OnInit } from '@angular/core';
import * as JSZip from 'jszip'; 
import * as FileSaver from 'file-saver'
import { Roster } from 'src/app/services/roster.service';
import { IInstrument } from 'src/app/shared/instrument';

const JSZipUtils = require('jszip-utils');

@Component({
  selector: 'app-filedownloaderclient',
  templateUrl: 'filedownloaderclient.component.html',
})
export class FiledownloaderclientComponent implements OnInit {
  instruments: IInstrument[] | undefined;
  errorMessage: string = "error!";
  imageWidth: number = 20;
  imageMargin: number = 2;

  constructor(public roster: Roster) { }

  ngOnInit(): void {

  }

  downloadZip(){
    this.instruments = this.roster.getSelectedInstruments();

    var zip = new JSZip();

    var imgFolder = zip.folder("images");

    let count = 1;

    const zipArray: any[] = [];

    Array.prototype.forEach.call(this.instruments, char => {
      Array.prototype.forEach.call(char.images, pic => {
        zipArray.push(pic);
      });
    });

    // function to read in a list of source zip files and return a merged archive
    function mergeZips(sources: any) {
      var zip = new JSZip();

      return readSources(sources)
          .then(function(data) {
              return data;
          });
}

// generate an array of promises for each zip we're reading in and combine them
// into a single promise with Promise.all()
    function readSources(files: any) {
      return Promise.all(
          files.map(function(file: any){
              return readSource(file);
          })
      );
    }

// promise-ified wrapper function to read & load a zip
    function readSource(file: any) {
      return new Promise(function(resolve, reject) {
          JSZipUtils.getBinaryContent(file, function (err: any, data: any) {
              if (err) {
                  reject(err);
              }
              resolve(data); 
          });
      });
    }

    // example usage:
    mergeZips(zipArray).then(function(data) {
      Array.prototype.forEach.call( data, d => {
        var imgName = ("000000"+count).slice(-4) + ".png";
        imgFolder?.file(imgName ?? "error_name", d, { binary: true });
        count++;
      });
      
      zip.generateAsync({type: 'blob'})
          .then(function(blob){
            FileSaver.saveAs(blob, "Images.zip");
          })
    });
  }
}
