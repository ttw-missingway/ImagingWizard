import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { ICharacter } from "../shared/character";
import { FileUpload } from "../shared/fileUpload";
import { environment } from "src/environments/environment";

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token'
    })
  };

@Injectable()

export class Roster{
    private characterUrl = '/api/character';
    public characters: ICharacter[] = [];

    constructor(private http: HttpClient) {};

    getCharacters(): Observable<ICharacter[]>{
        return this.http.get<ICharacter[]>(this.characterUrl)
            .pipe(map(data => {
                this.characters = data;
                return data;
            }))
    }

    getCharacter(id:number): Observable<ICharacter> {
        return this.http.get<ICharacter>(this.characterUrl + "/" + id)
            .pipe(map(data => {
                return data;
            }))
    }

    deleteCharacter(id:number): Observable<number> {
        return this.http.delete<number>(this.characterUrl + "/" + id);
    }

    addCharacter(character: ICharacter): Observable<ICharacter> {
        let formData = new FormData();

        Object.entries(character)
            .forEach(([key, value]) => {
                formData.append(key, value);
                console.log(key + ", " +  value);
            })
        
        // character.pics.forEach(pic => formData.append('pics', pic));
        Array.prototype.forEach.call(character.pics, pic => {
            console.log(pic);
            formData.append('pics', pic);
          });
        
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data') ;
        headers.append('Access-Control-Allow-Origin', '*');

        return this.http.post<ICharacter>(this.characterUrl, formData, {headers: headers});
      }
}