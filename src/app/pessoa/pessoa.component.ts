
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';  
import { Observable } from 'rxjs';  
import { PessoaService } from '../pessoa.service';  
import { Pessoa } from '../pessoa';  
@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit {
  dataSaved = false;  
  pessoaForm: any;  
  allPessoas: Observable<Pessoa[]>;  
  pessoaIdUpdate = null;  
  message = null;  
  constructor(private formbulider: FormBuilder, private pessoaService:PessoaService) { }
  ngOnInit() {
    this.pessoaForm = this.formbulider.group({  
      Nome: ['', [Validators.required]],  
      Email: ['', [Validators.required]],  
    });  
    this.loadAllPessoas();  
  }
  loadAllPessoas() {  
    this.allPessoas = this.pessoaService.getAllPessoas();  
  } 
  onFormSubmit() {  
    this.dataSaved = false;  
    const pessoa = this.pessoaForm.value;  
    this.CreatePessoa(pessoa);  
    this.pessoaForm.reset();  
  } 
  CreatePessoa(pessoa: Pessoa) {  
    if (this.pessoaIdUpdate == null) {  
      this.pessoaService.createPessoa(pessoa).subscribe(  
        () => {  
          this.dataSaved = true;  
          this.message = 'Registro salvo com sucesso';  
          this.loadAllPessoas();  
          this.pessoaIdUpdate = null;  
          this.pessoaForm.reset();  
        }  
      );  
    } else {  
      pessoa.pessoaId = this.pessoaIdUpdate;  
      this.pessoaService.updatePessoa(this.pessoaIdUpdate,pessoa).subscribe(() => {  
        this.dataSaved = true;  
        this.message = 'Registro atualizado com sucesso';  
        this.loadAllPessoas();  
        this.pessoaIdUpdate = null;  
        this.pessoaForm.reset();  
      });  
    }  
  }  
  loadPessoaToEdit(pessoaid: string) {  
    this.pessoaService.getPessoaById(pessoaid).subscribe(pessoa=> {  
      this.message = null;  
      this.dataSaved = false;  
      this.pessoaIdUpdate = pessoa.pessoaId;  
      this.pessoaForm.controls['Nome'].setValue(pessoa.nome);  
      this.pessoaForm.controls['Email'].setValue(pessoa.email);  
    });    
  }  
  deletePessoa(pessoaid: string) {  
    if (confirm("Deseja realmente deletar este pessoa ?")) {   
      this.pessoaService.deletePessoaById(pessoaid).subscribe(() => {  
        this.dataSaved = true;  
        this.message = 'Registro deletado com sucesso';  
        this.loadAllPessoas();  
        this.pessoaIdUpdate = null;  
        this.pessoaForm.reset();  
      });  
    }  
  }  
  resetForm() {  
    this.pessoaForm.reset();  
    this.message = null;  
    this.dataSaved = false;  
  } 
}