import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { finalize, Observable } from "rxjs";
import { Roster } from "../services/roster.service";
import { ICharacter } from "../shared/character";
import { FileUpload } from "../shared/fileUpload";

@Component({
    selector: "create-character",
    templateUrl: "createCharacterPage.component.html",
    styleUrls: ["createCharacterPage.component.css"]
})

export class CreateCharacterPage{

    constructor(
        private formBuilder: FormBuilder,
        private roster: Roster
    ){}

    files!:[];

    creationForm = this.formBuilder.group({
        handle: "",
        firstName: "",
        lastName: "",
        main: "",
        secondary: "",
        elo: "",
        pics: ""
      });

    onSubmit(form: ICharacter){
        console.log(form.handle + " has been submitted");
        form.pics = this.files;
        this.postCharacter(form);
    }

    onFileSelected(event: any){
        this.files = event.target.files;
    }

    postCharacter(character: ICharacter){
        if (character){
            this.roster.addCharacter(character).subscribe();
            console.log(character.handle + " has been sent to roster service");
        }
        // location.reload();
    }
}