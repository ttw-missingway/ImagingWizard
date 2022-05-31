import { Component, OnInit, NgZone,  ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable} from "rxjs";
import { Roster } from "../services/roster.service";
import { ICharacter } from "../shared/character";

@Component({
    selector: "detail-page",
    templateUrl: "characterDetailPage.component.html",
})

export class CharacterDetailPage implements OnInit{
    imageWidth: number = 200;
    imageMargin: number = 2;
    title = "Detail Page";
    errorMessage = "Error!"
    character : ICharacter | undefined;
    characterObservable = {} as Observable<ICharacter>;

    constructor(private route: ActivatedRoute, private rosterService: Roster) {}

    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        if (id){
            this.GetCharacter(id);
        }
    }

    GetCharacter(id:number): void{
        this.characterObservable = this.rosterService.getCharacter(id);
        this.characterObservable.subscribe({
            next: character => this.character = character,
            error: err => this.errorMessage = err
        })
    }
}