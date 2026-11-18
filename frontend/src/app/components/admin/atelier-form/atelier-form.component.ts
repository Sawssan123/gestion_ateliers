import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AtelierService } from '../../../services/atelier.service';
import { Atelier } from '../../../models/atelier.model';

@Component({
  selector: 'app-atelier-form',
  templateUrl: './atelier-form.component.html',
  styleUrls: ['./atelier-form.component.css']
})
export class AtelierFormComponent implements OnInit {

  atelierForm!: FormGroup;
  atelierId: number | null = null;

  isSubmitting = false;
  errorMessage = '';

  showConfirmation = false;
  confirmationTitle = '';
  confirmationMessage = '';

  constructor(
    private fb: FormBuilder,
    private atelierService: AtelierService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.atelierForm = this.fb.group({
      titre: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', Validators.required],
      date: ['', Validators.required],
      duree: [1, [Validators.required, Validators.min(1)]],
      capacite: [1, [Validators.required, Validators.min(1)]]
    });

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.atelierId = Number(id);
      this.loadAtelier(this.atelierId);
    }
  }

  // Charger les informations de l'atelier
  loadAtelier(id: number): void {

    this.atelierService.getAtelier(id).subscribe({
      next: (atelier: Atelier) => {

        this.atelierForm.patchValue({
          titre: atelier.titre,
          description: atelier.description,
          date: atelier.date?.substring(0, 10),
          duree: atelier.duree,
          
        });

      },
      error: () => {
        this.errorMessage = 'Impossible de charger cet atelier.';
      }
    });
  }

  // Soumettre le formulaire
  onSubmit(): void {

    this.atelierForm.markAllAsTouched();

    if (this.atelierForm.invalid) {
      return;
    }

    this.confirmationTitle = this.atelierId
      ? 'Confirmation de modification'
      : 'Confirmation d’ajout';

    this.confirmationMessage = this.atelierId
      ? 'Voulez-vous vraiment modifier cet atelier ?'
      : 'Voulez-vous vraiment ajouter cet atelier ?';

    this.showConfirmation = true;
  }

  // Confirmer l'ajout ou la modification
  confirmSave(): void {

    if (this.isSubmitting) return;

    this.isSubmitting = true;
    this.errorMessage = '';

    const atelier: Atelier = this.atelierForm.value;

    const request = this.atelierId
      ? this.atelierService.updateAtelier(this.atelierId, atelier)
      : this.atelierService.addAtelier(atelier);

    request.subscribe({

      next: () => {
        this.isSubmitting = false;
        this.showConfirmation = false;
        this.router.navigate(['/admin/ateliers']);
      },

      error: (error) => {
        console.error(error);

        this.isSubmitting = false;
        this.showConfirmation = false;

        this.errorMessage =
          error.error?.message || 'Erreur lors de l’enregistrement.';
      }

    });
  }

  // Annuler la confirmation
  cancelConfirmation(): void {
    this.showConfirmation = false;
  }

  // Retour à la liste
  cancel(): void {
    this.router.navigate(['/admin/ateliers']);
  }
}