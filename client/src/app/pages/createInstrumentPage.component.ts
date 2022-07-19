import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { finalize, Observable } from "rxjs";
import { Roster } from "../services/roster.service";
import { IInstrument } from "../shared/instrument";
import { FileUpload } from "../shared/fileUpload";
import { Byte } from "@angular/compiler/src/util";
import { fileURLToPath } from "url";
import { Guid } from "guid-typescript";
import { EmitType } from "@syncfusion/ej2-base";
import { UploaderComponent } from "@syncfusion/ej2-angular-inputs";

@Component({
    selector: "create-instrument",
    templateUrl: "createInstrumentPage.component.html",
    styleUrls: ["createInstrumentPage.component.scss"]
})

export class CreateInstrumentPage{

    constructor(
        private formBuilder: FormBuilder,
        private roster: Roster
    ){}

    files!: any[];
    States: any = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
    imageWidth: number = 100;
    imageMargin: number = 2;

    creationForm = this.formBuilder.group({
        state: ['', [Validators.required]],
        county: "",
        book: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
        startingPage: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
        notes: "",
        images: "",
      });

    onSubmit(form: IInstrument){
        form.images = this.files;
        this.postInstrument(form);
    }

    onFileDropped($event: any) {
        this.files = $event;
        console.log($event.target.files[0]);
    }

    onFileSelected($event: any){
        this.files = $event.target.files;
    }

    changeState($event: any){
        this.stateName?.setValue($event.target.value, {
            onlySelf: true
          })
    }

    get stateName() {
        return this.creationForm.get('stateName');
      }

    postInstrument(instrument: IInstrument){
        if (instrument){
            this.roster.addInstrument(instrument).subscribe({
                next: () => {
                    location.reload();
                }
            });
        }
    }

    // imagePreview(file: any) {
    //     var filePath = "";

    //     const reader = new FileReader();
    //     reader.onload = () => {
    //       filePath = reader.result as string;
    //     }
    //     reader.readAsDataURL(file)

    //     return filePath;
    //   }

//       /**
//    * format bytes
//    * @param bytes (File size in bytes)
//    * @param decimals (Decimals point)
//    */
//   formatBytes(bytes: number, decimals: number) {
//     if (bytes === 0) {
//       return '0 Bytes';
//     }
//     const k = 1024;
//     const dm = decimals <= 0 ? 0 : decimals || 2;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
//   }
}