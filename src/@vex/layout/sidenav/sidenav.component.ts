import { Component, Input, OnInit } from "@angular/core";
import { NavigationService } from "../../services/navigation.service";
import { LayoutService } from "../../services/layout.service";
import { ConfigService } from "../../config/config.service";
import { map, startWith, switchMap } from "rxjs/operators";
import { NavigationLink } from "../../interfaces/navigation-item.interface";
import { PopoverService } from "../../components/popover/popover.service";
import { Observable, of } from "rxjs";
import { UserMenuComponent } from "../../components/user-menu/user-menu.component";
import { MatDialog } from "@angular/material/dialog";
import { SearchModalComponent } from "../../components/search-modal/search-modal.component";
import { UserService } from "@core/services/user.service";
import { User } from "@core/models/user.model";
import { getUserRole } from "@shared/utils/getUserRole";
import { getFinalStringRoleNames } from "@vex/utils/get-final-string-role-names";

@Component({
  selector: "vex-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"]
})
export class SidenavComponent implements OnInit {
  @Input() collapsed: boolean;
  collapsedOpen$ = this.layoutService.sidenavCollapsedOpen$;
  title$ = this.configService.config$.pipe(map(config => config.sidenav.title));
  imageUrl$ = this.configService.config$.pipe(
    map(config => config.sidenav.imageUrl)
  );
  showCollapsePin$ = this.configService.config$.pipe(
    map(config => config.sidenav.showCollapsePin)
  );
  userVisible$ = this.configService.config$.pipe(
    map(config => config.sidenav.user.visible)
  );
  searchVisible$ = this.configService.config$.pipe(
    map(config => config.sidenav.search.visible)
  );

  panelOpenState = false;

  roles = [];
  optionsRolesHtml = '';

  user: User = null;
  currrentRole: any = null;

  userMenuOpen$: Observable<boolean> = of(false);

  items = this.navigationService.items;
  sidenavItsOpen: boolean;
  itsCallToggleSidenav: boolean = false;
  aux: boolean = false;

  isDesktop: boolean = false;

  constructor(
    private navigationService: NavigationService,
    private layoutService: LayoutService,
    private configService: ConfigService,
    private readonly popoverService: PopoverService,
    private readonly dialog: MatDialog,
    private userService: UserService
  ) {}

  ngOnInit() {
    const originalUser = this.userService.getUser();
    if(originalUser){
      originalUser.roles = getUserRole(originalUser?.roles);
    }
    this.user = originalUser;
    this.currrentRole = (this.userService.getCurrentRole() as any )

    this.layoutService.sidenavOpen$.subscribe({
      next: (value) => {
        this.sidenavItsOpen = value;
      }
    })

    this.layoutService.isDesktop$.subscribe({
      next: (value) => {
        this.isDesktop = value;
      }
    })
  }

  collapseOpenSidenav() {
    this.layoutService.collapseOpenSidenav();
  }

  collapseCloseSidenav() {
    // if(this.isDesktop) {
      this.layoutService.collapseCloseSidenav();
    // } else {
      // this.layoutService.collapseOpenSidenav();
    // }
  }

  toggleCollapse() {
    this.collapsed
      ? this.layoutService.expandSidenav()
      : this.layoutService.collapseSidenav();
  }

  trackByRoute(index: number, item: NavigationLink): string {
    return item.route;
  }

  openProfileMenu(origin: HTMLDivElement): void {
    this.userMenuOpen$ = of(
      this.popoverService.open({
        content: UserMenuComponent,
        origin,
        offsetY: -8,
        width: origin.clientWidth,
        position: [
          {
            originX: "center",
            originY: "top",
            overlayX: "center",
            overlayY: "bottom"
          }
        ]
      })
    ).pipe(
      switchMap(popoverRef => popoverRef.afterClosed$.pipe(map(() => false))),
      startWith(true)
    );
  }

  openSearch(): void {
    this.dialog.open(SearchModalComponent, {
      panelClass: "vex-dialog-glossy",
      width: "100%",
      maxWidth: "600px"
    });
  }

  toggleHideSidenav(clickedOutside: boolean) {
    if(!this.isDesktop) {
      if(clickedOutside && this.aux && !this.itsCallToggleSidenav) {
        this.layoutService.closeSidenav();
        this.itsCallToggleSidenav = true;
      } else {
        this.itsCallToggleSidenav = false;
      }
      this.aux = this.sidenavItsOpen;
    }
  }
}
