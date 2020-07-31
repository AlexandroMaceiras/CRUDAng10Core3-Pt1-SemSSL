import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { Pessoa } from './pessoa'; 

var httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};

@Injectable({
  providedIn: 'root'
})
export class PessoaService { 
  url = 'http://177.138.81.67:8081/api/pessoas';  
  constructor(private http: HttpClient) { }
  getAllPessoas(): Observable<Pessoa[]> {  
    return this.http.get<Pessoa[]>(this.url);  
  }  
  getPessoaById(pessoaid: string): Observable<Pessoa> {  
    const apiurl = `${this.url}/${pessoaid}`;
    return this.http.get<Pessoa>(apiurl);  
  } 
  createPessoa(pessoa: Pessoa): Observable<Pessoa> {  
    return this.http.post<Pessoa>(this.url, pessoa, httpOptions);  
  }  
  updatePessoa(pessoaid: string, pessoa: Pessoa): Observable<Pessoa> {  
    const apiurl = `${this.url}/${pessoaid}`;
    return this.http.put<Pessoa>(apiurl,pessoa, httpOptions);  
  }  
  deletePessoaById(pessoaid: string): Observable<number> {  
    const apiurl = `${this.url}/${pessoaid}`;
    return this.http.delete<number>(apiurl, httpOptions);  
  }  
}
