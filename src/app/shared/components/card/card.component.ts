import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, AUTO_STYLE, state, style, transition, trigger} from '@angular/animations';
import {AuthenticationService} from '@app/core/auth/services';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('collapsedCard', [
      state('collapsed, void',
        style({
          overflow: 'hidden',
          height: '0px',
        })
      ),
      state('expanded',
        style({
          overflow: 'hidden',
          height: AUTO_STYLE,
        })
      ),
      transition('collapsed <=> expanded', [
        animate('400ms ease-in-out')
      ])
    ]),
    trigger('cardRemove', [
      state('open', style({
        opacity: 1
      })),
      state('closed', style({
        opacity: 0,
        display: 'none'
      })),
      transition('open <=> closed', animate('400ms')),
    ])
  ]
})

export class CardComponent implements OnInit {
  @Input() cardTitle: string;
  @Input() cardClass: string;
  @Input() blockClass: string;
  @Input() headerClass: string;
  @Input() options: boolean;
  @Input() hidHeader: boolean;
  @Input() customHeader: boolean;
  @Input() disableButton: boolean = false;
  @Input() button;
  @Output() buttonClicked = new EventEmitter<any>();
  public animation: string;
  public fullIcon: string;
  public isAnimating: boolean;
  /*public animator: AnimationBuilder;
  public animators: AnimationBuilder;*/

  public collapsedCard: string;
  public collapsedIcon: string;

  public loadCard: boolean;

  public cardRemove: string;

  constructor(private authenticationService: AuthenticationService) {
    this.customHeader = false;
    this.options = true;
    this.hidHeader = false;
    this.cardTitle = 'Card Title';

    this.fullIcon = 'icon-maximize';
    this.isAnimating = false;

    this.collapsedCard = 'expanded';
    this.collapsedIcon = 'icon-minus';

    this.loadCard = false;

    this.cardRemove = 'open';
  }

  ngOnInit() {
    if (!this.options || this.hidHeader || this.customHeader) {
      this.collapsedCard = 'false';
    }
  }

  onButtonClicked() {
    this.buttonClicked.emit(true);
  }

  public fullCardToggle(element: HTMLElement, animation: string, status: boolean) {
    animation = this.cardClass === 'full-card' ? 'zoomOut' : 'zoomIn';
    this.fullIcon = this.cardClass === 'full-card' ? 'icon-maximize' : 'icon-minimize';
    // const duration = this.cardClass === 'full-card' ? 300 : 600;
    this.cardClass = this.cardClass === 'full-card' ? this.cardClass : 'full-card';
    if (status) {
      this.animation = animation;
    }
    this.isAnimating = true;

    setTimeout(() => {
      this.cardClass = animation === 'zoomOut' ? '' : this.cardClass;
      if (this.cardClass === 'full-card') {
        document.querySelector('body').style.overflow = 'hidden';
      } else {
        document.querySelector('body').removeAttribute('style');
      }
    }, 500);
  }

  collapsedCardToggle(event) {
    this.collapsedCard = this.collapsedCard === 'collapsed' ? 'expanded' : 'collapsed';
    this.collapsedIcon = this.collapsedCard === 'collapsed' ? 'icon-plus' : 'icon-minus';
  }

  cardRefresh() {
    this.loadCard = true;
    this.cardClass = 'card-load';
    setTimeout(() => {
      this.loadCard = false;
      this.cardClass = 'expanded';
    }, 3000);
  }

  cardRemoveAction() {
    this.cardRemove = this.cardRemove === 'closed' ? 'open' : 'closed';
  }

  findCommonRoles(userRoles) {
    if (userRoles) {
      return this.authenticationService.findCommonRoles(userRoles,
        this.authenticationService.getCurrentUser.roles
      );
    } else {
      return this.authenticationService.findCommonRoles(['ROLE_ADMIN'],
        this.authenticationService.getCurrentUser.roles
      );
    }
  }

}
