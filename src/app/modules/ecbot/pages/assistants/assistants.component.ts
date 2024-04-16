import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TableAssistantsComponent } from '../../components/table-assistants/table-assistants.component';
import { NavbarService } from '../../../../shared/services/navbar.service';
import { InputSearchComponent } from '../../../../shared/components/input-search/input-search.component';

@Component({
  selector: 'app-assistants',
  standalone: true,
  imports: [TableAssistantsComponent, RouterModule, InputSearchComponent],
  templateUrl: './assistants.component.html',
  styleUrl: './assistants.component.scss'
})
export class AssistantsComponent {

  @ViewChild(TableAssistantsComponent) tableAgents!: TableAssistantsComponent;

  constructor(
    private navbarService  : NavbarService,
  ) { }

  ngOnInit(): void {
    this.navbarService.setTitle('Bienvenido');
  }

  searchAgents(search:string){
    this.tableAgents.data.searchWords = search;
    this.tableAgents.getAssistants();
  }

}
