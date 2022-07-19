import { Component, OnDestroy, OnInit } from "@angular/core";
import { filter, Observable, Subscription } from "rxjs";
import { Roster } from "../services/roster.service";
import { IInstrument } from "../shared/instrument";

@Component({
    selector: "instrument-list",
    templateUrl: "instrumentListView.component.html",
    styleUrls: ["instrumentListView.component.css"]
}) 

export default class InstrumentListView implements OnInit, OnDestroy{

    public instruments: IInstrument[] = [];
    filteredInstruments: IInstrument[] = [];
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string = '';
    sub!: Subscription;
    private _inputString: string = "";
    public selectedRows: Set<IInstrument> = new Set<IInstrument>();
    selectedId!: string;

    get inputString():string{
        return this._inputString;
    }

    set inputString(value:string){
        this._inputString = value;
        this.filteredInstruments = this.performFilter(value);
    }

    constructor(public roster: Roster){
        this.instruments = roster.instruments;
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngOnInit(): void {
        this.sub = this.roster.getInstruments()
            .subscribe({
                next: instruments => {
                    this.instruments = instruments;
                    this.filteredInstruments = this.instruments;
                }, 
                error: err => this.errorMessage = err
            });
    }

    performFilter(filterBy:string): IInstrument[]{
        filterBy = filterBy.toLocaleLowerCase();
        return this.instruments.filter((instrument: IInstrument) => 
            instrument.county.toLocaleLowerCase().includes(filterBy))
    }

    deleteInstrument(id: number){
        this.roster.deleteInstrument(id).subscribe({
            next: () => {
                location.reload();
            }
        });
    }

    onRowClick(instrument: IInstrument) {
        if(this.selectedRows.has(instrument)) {
         this.selectedRows.delete(instrument);
        }
        else {
          this.selectedRows.add(instrument);
        }

        this.selectedRows.forEach(i => console.log(i.images[0]));

        const array = Array.from(this.selectedRows);

        this.roster.setSelectedInstruments(array);
      }
    
    rowIsSelected(instrument: IInstrument) {
        return this.selectedRows.has(instrument);
    }

    getSelectedRows(){
        var rowsToDownload = this.instruments.filter(i => this.selectedRows.has(i));
            
        rowsToDownload.forEach(i => {
            console.log("DOWNLOADING: " + i.county + "_" + i.book + "_" + i.startingPage);
        });

        return rowsToDownload;
    }

    onLogClick() {
        console.log(this.getSelectedRows());
    }
}