import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@shared/common-services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.validateAuthentication()
  }

  private validateAuthentication (): void {
    if (this.userService.isAuthenticated()) {
      this.router.navigate(['/daily'], { relativeTo: this.activatedRoute });
    }
  }
}
