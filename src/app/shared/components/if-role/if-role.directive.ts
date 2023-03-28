import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Role } from '../../services/auth/role.model';

@Directive({
  selector: '[appIfRole]',
})
export class IfRoleDirective implements OnInit {
  @Input() appIfRole: string | null | undefined;

  constructor(
    private userService: UserService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) { }

  ngOnInit() {
    if (!this.appIfRole || (this.userService.user$.value !== null && Role[this.userService.user$.value!.role] === (this.appIfRole))) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
