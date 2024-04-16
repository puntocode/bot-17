import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TableUsersComponent } from '../../components/table-users/table-users.component';
import { NavbarService } from '../../../../shared/services/navbar.service';
import { InputSearchComponent } from '../../../../shared/components/input-search/input-search.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterModule, TableUsersComponent, InputSearchComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  constructor(
    private navbarService: NavbarService,
  ) {}

  ngOnInit() {
    this.navbarService.setTitle('Usuarios');
  }

  searchUsers(event: string) {
    console.log(event);
  }

}
