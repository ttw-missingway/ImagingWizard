import { Component, OnDestroy, OnInit } from "@angular/core";
import { filter, Observable, Subscription } from "rxjs";
import { Roster } from "../services/roster.service";
import { ICharacter } from "../shared/character";

@Component({
    selector: "character-list",
    templateUrl: "characterListView.component.html",
    styleUrls: ["characterListView.component.css"]
}) 

export default class CharacterListView implements OnInit, OnDestroy{

    public characters: ICharacter[] = [];
    filteredCharacters: ICharacter[] = [];
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string = '';
    sub!: Subscription;
    private _inputString: string = "";
    selectedRows: Set<ICharacter> = new Set<ICharacter>();
    selectedId!: string;

    get inputString():string{
        return this._inputString;
    }

    set inputString(value:string){
        this._inputString = value;
        this.filteredCharacters = this.performFilter(value);
    }

    constructor(public roster: Roster){
        this.characters = roster.characters
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngOnInit(): void {
        this.sub = this.roster.getCharacters()
            .subscribe({
                next: characters => {
                    this.characters = characters;
                    this.filteredCharacters = this.characters;
                }, 
                error: err => this.errorMessage = err
            });
    }

    performFilter(filterBy:string): ICharacter[]{
        console.log("filtering by string: " + filterBy);
        filterBy = filterBy.toLocaleLowerCase();
        return this.characters.filter((character: ICharacter) => 
            character.handle.toLocaleLowerCase().includes(filterBy))
    }

    deleteCharacter(id: number){
        this.roster.deleteCharacter(id).subscribe();
        location.reload();
    }

    onRowClick(character: ICharacter) {
        console.log("row has been clicked");

        if(this.selectedRows.has(character)) {
         this.selectedRows.delete(character);
        }
        else {
          this.selectedRows.add(character);
        }

        this.selectedRows
            .forEach(c => {
        console.log(c.handle);
        });
      }
    
    rowIsSelected(character: ICharacter) {
        console.log("Row Is Selected");
        return this.selectedRows.has(character);
    }

    getSelectedRows(){
        console.log("getting selected rows");

        var rowsToDownload = this.characters.filter(c => this.selectedRows.has(c));
            
        rowsToDownload.forEach(c => {
            console.log("DOWNLOADING: " + c.handle);
        });

        return rowsToDownload;
    }

    onLogClick() {
        console.log(this.getSelectedRows());
    }
}