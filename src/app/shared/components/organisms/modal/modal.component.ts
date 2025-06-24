import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @ViewChild('mainModal') modal: ElementRef;

  @Input() isVisible: boolean = false;
  @Input() showCloseButton: boolean = true;
  @Input() buttonOrientation: 'horizontal' | 'vertical' = 'horizontal';
  @Output() emmitCloseModal = new EventEmitter();
  @Output() emmitActionButtonClick = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.modal) {
      const modalEelement = this.modal.nativeElement;
      modalEelement.focus();
    }
  }

  closeModal() {
    if (this.modal) {
      this.emmitCloseModal.emit();
    }
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (this.isVisible && event.key === 'Tab') {
      event.preventDefault();
      const modalElement = this.modal.nativeElement;
      const focusableElements = modalElement.querySelectorAll('button, app-button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');

      const validFocusableElements = Array.from(focusableElements).filter(element => {
        if (element instanceof HTMLElement) {
          return element.getAttribute('tabindex') !== null;
        }
        return false;
      }) as HTMLElement[];

      const activeElementIndex = validFocusableElements.findIndex(element => document.activeElement === element);

      if (event.shiftKey) {
        const previousElementIndex = activeElementIndex > 0 ? activeElementIndex - 1 : validFocusableElements.length - 1;
        validFocusableElements[previousElementIndex].focus();
      } else {
        const nextElementIndex = activeElementIndex < validFocusableElements.length - 1 ? activeElementIndex + 1 : 0;
        validFocusableElements[nextElementIndex].focus();
      }
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const activeElement = document.activeElement as HTMLElement;
      const isButtonInModal = this.modal.nativeElement.contains(activeElement);

      if (isButtonInModal) {
        if (activeElement.className === 'close-button') {
          this.emmitCloseModal.emit();
        } else if (activeElement.hasAttribute('data-action')) {
          const action = activeElement.getAttribute('data-action');
          this.emmitActionButtonClick.emit(action);
        }
      }
    }
  }

  @HostListener('click', ['$event.target'])
  onClick(target: HTMLElement) {
    const activeElement = document.activeElement as HTMLElement;

    if (!this.modal) {
      const isCloseButton = target.tagName.toLowerCase() === 'i' || (target instanceof HTMLElement && target.classList.contains('close-button'));
      if (isCloseButton) {
        this.emmitCloseModal.emit();
        return;
      }
    }

    if (this.modal) {
      const isButtonInModal = this.modal.nativeElement.contains(activeElement);

      const appButton = target.closest('app-button');

      if (isButtonInModal && appButton) {
        if (appButton.hasAttribute('data-action')) {
          const action = appButton.getAttribute('data-action');
          this.emmitActionButtonClick.emit(action);
        }
      }
    }
  }
}
