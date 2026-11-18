import { Component, EventEmitter, Input, Output } from '@angular/core';

export type ModalVariant = 'primary' | 'danger';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent {

  @Input() title = 'Confirmation';
  @Input() message = 'Voulez-vous vraiment continuer ?';
  @Input() confirmLabel = 'Oui, confirmer';
  @Input() cancelLabel = 'Non, annuler';
  @Input() variant: ModalVariant = 'primary';
  @Input() loading = false;

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  get icon(): string {
    return this.variant === 'danger' ? '!' : '?';
  }

  onConfirm(): void {
    if (this.loading) {
      return;
    }
    this.confirm.emit();
  }

  onCancel(): void {
    if (this.loading) {
      return;
    }
    this.cancel.emit();
  }
}