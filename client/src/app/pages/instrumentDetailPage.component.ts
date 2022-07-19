import { Component, OnInit, NgZone,  ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable} from "rxjs";
import { Roster } from "../services/roster.service";
import { IInstrument } from "../shared/instrument";

@Component({
    selector: "detail-page",
    templateUrl: "instrumentDetailPage.component.html",
})

export class InstrumentDetailPage implements OnInit{
    imageWidth: number = 200;
    imageMargin: number = 2;
    title = "Detail Page";
    errorMessage = "Error!"
    instrument : IInstrument | undefined;
    notes: string = "hjkhjhkjh";
    instrumentObservable = {} as Observable<IInstrument>;

    constructor(private route: ActivatedRoute, private rosterService: Roster) {}

    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        if (id){
            this.GetInstrument(id);
        }
    }

    GetInstrument(id:number): void{
        this.instrumentObservable = this.rosterService.getInstrument(id);
        this.instrumentObservable.subscribe({
            next: instrument => {
                this.instrument = instrument;
                this.notes = instrument.notes;
            },
            error: err => this.errorMessage = err
        })
    }

    UpdateInstrument(): void{
        console.log("updating instrument");
        if (this.instrument != undefined){
            this.rosterService.updateInstrument(this.instrument, this.notes).subscribe({
                next: (v) => console.log(v),
                error: (e) => console.error(e),
                complete: () => {
                    console.info('complete');
                    location.reload();
                }
            });
        }
        else{
            console.log("There has been an error, cannot update instrument as instrument is undefined");
        }
    }
}