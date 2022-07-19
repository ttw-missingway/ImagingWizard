import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { IInstrument } from "../shared/instrument";
import { FileUpload } from "../shared/fileUpload";
import { environment } from "src/environments/environment";
import { Guid } from "guid-typescript";
import { LoginRequest, LoginResults } from "../shared/loginResults";
import { OnInit } from "@angular/core";

@Injectable()

export class Roster implements OnInit{
    private instrumentUrl = '/api/instrument';
    public instruments: IInstrument[] = [];
    public selectedInstruments: IInstrument[] = [];

    constructor(private http: HttpClient) {}
    
    ngOnInit(): void {
    }

    getInstruments(): Observable<IInstrument[]>{
        return this.http.get<IInstrument[]>(this.instrumentUrl)
            .pipe(map(data => {
                this.instruments = data;
                return data;
            }))
    }

    getInstrument(id:number): Observable<IInstrument> {
        return this.http.get<IInstrument>(this.instrumentUrl + "/" + id)
            .pipe(map(data => {
                return data;
            }))
    }

    updateInstrument(instrument: IInstrument, notes: string): Observable<IInstrument> {
        let formData = new FormData();
        Object.entries(instrument)
            .forEach(([key, value]) => {
                if (key == "notes"){
                    formData.append(key, notes);
                }
                else if (key != "images"){
                    formData.append(key, value);
                }
            });

        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data') ;
        headers.append('Access-Control-Allow-Origin', '*');

        return this.http.put<IInstrument>(this.instrumentUrl, formData, { headers: headers });

    }

    isLoggedIn(): Observable<boolean> {
        return this.http.get<boolean>("/account/isloggedin");
    }

    deleteInstrument(id:number): Observable<number> {
        return this.http.delete<number>(this.instrumentUrl + "/" + id);
    }

    addInstrument(instrument: IInstrument): Observable<IInstrument> {
        let formData = new FormData();

        Object.entries(instrument)
            .forEach(([key, value]) => {
                formData.append(key, value);
            });
        
        // instrument.pics.forEach(pic => formData.append('pics', pic));
        Array.prototype.forEach.call(instrument.images, pic => {
            formData.append('images', pic, pic.name + "_" + Guid.create().toString() + ".png");
          });
        
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data') ;
        // headers.append('Access-Control-Allow-Origin', '*');

        return this.http.post<IInstrument>(this.instrumentUrl, formData, {headers: headers});
    }

    setSelectedInstruments(selected: IInstrument[]) {
        this.selectedInstruments = selected;
    }

    getSelectedInstruments():IInstrument[]{
        return this.selectedInstruments;
    }
}