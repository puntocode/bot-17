import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ExampleService } from '../../services/example.service';
import { lastValueFrom } from 'rxjs';
import { general } from '../../../../shared/constant/general.constant';

@Component({
  selector: 'app-example-proof',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './example-proof.component.html',
  styleUrl: './example-proof.component.scss'
})
export class ExampleProofComponent {
  isUpdating: boolean = false;
  examples: any [] = [];

  example = {
    id: 0,
    input: '',
    output: '',
    agentId: 0
  }

  constructor(
    private exampleService: ExampleService,
    private toastr        : ToastrService,
  ) {}

  // Getters--------------------------------------------------------------------------------

  get isValid(){
    return this.example.input && this.example.output && this.example.agentId;
  }

  // Methods--------------------------------------------------------------------------------

  async getExamples(agentId: number | null){
    this.examples = [];
    this.resetForm();

    if(!agentId) return;
    this.example.agentId = agentId;

    try {
      this.isUpdating = true;
      const examples$ = this.exampleService.getExampleByAgentId(agentId);
      this.examples = await lastValueFrom(examples$);

    } catch (error) {
      this.toastr.error('Ocurrió un error al obtener los ejemplos del agente');

    } finally {
      this.isUpdating = false;
    }
  }


  async onSubmit(){
    if(!this.example.agentId) return;

    try {
      if(!this.isValid) throw new Error('Todos los campos son requeridos');

      this.isUpdating = true;
      let response$ = this.exampleService.create(this.example);
      if(this.example.id) response$ = this.exampleService.update(this.example, this.example.id);
      const response = await lastValueFrom(response$);

      setTimeout(() => {
        this.getExamples(this.example.agentId);
        this.toastr.success(response.message);
      }, 1000);

    } catch (error:any) {
      this.toastr.error(error.message || general.ERROR_UPDATE);
      this.isUpdating = false;
    }
  }



  setExample(example: any){
    this.example = example;
  }


  /**
   * Borrado de un ejemplo
   * @param example
   */
    async deleteExample(id: number){
      if(!id) return;

      try {
        this.isUpdating = true;
        const response$ = this.exampleService.delete(id);
        const response = await lastValueFrom(response$);

        setTimeout(() => {
          this.getExamples(this.example.agentId);
          this.toastr.success(response.message);
        }, 1000);

      } catch (error) {
        this.toastr.error(general.ERROR_DELETE);
        this.isUpdating = false;
      }
    }


  resetForm(){
    this.example = {
      id: 0,
      input: '',
      output: '',
      agentId: 0
    }
  }
}
