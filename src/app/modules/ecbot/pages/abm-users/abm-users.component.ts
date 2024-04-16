import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';

import { LabelComponent } from '../../../../shared/components/label/label.component';
import { NavbarService } from '../../../../shared/services/navbar.service';
import { UserService } from '../../services/user.service';
import { RolesService } from '../../../../shared/services/roles.service';
import { Role } from '../../../../shared/interfaces/role.interface';

@Component({
  selector: 'app-abm-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    LabelComponent,
    RouterModule
  ],
  templateUrl: './abm-users.component.html',
  styleUrl: './abm-users.component.scss'
})
export class AbmUsersComponent {

  roles:Role[] = [];
  isSaving: boolean = false;
  isUploading: boolean = false;

  userForm:any = {
    id: null,
    name: "",
    lastname: "",
    password: "",
    rolId: null,
  };

  constructor(
    private navbarService : NavbarService,
    private roleService   : RolesService,
    private routeActivated: ActivatedRoute,
    private router        : Router,
    private toastr        : ToastrService,
    private userService   : UserService,
  ) { }

  ngOnInit(): void {
    this.userForm.id = this.routeActivated.snapshot.paramMap.get('id');

    const title = this.userForm.id ? 'Editar usuario' : 'Agregar usuario';
    this.navbarService.setTitle(title, 'ecbot/usuarios');

    this.roleService.getRoles().subscribe(roles => this.roles = roles);
  }

  //GETTERS---------------------------------------------------------------------------------

  get isInvalid(){
    return true;
  }

  get titleBtn(){
    return this.userForm.id ? 'Actualizar' : 'Guardar';
  }

  get passInvalid(){
    return !this.userForm.id && this.userForm.password!.length < 8;
  }


  //METHODS---------------------------------------------------------------------------------

  onSubmit(){
    console.log(this.userForm)
  }

}
