import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Atelier } from '../../../models/atelier.model';
import { AtelierService } from '../../../services/atelier.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-ateliers',
  templateUrl: './ateliers.component.html',
  styleUrls: ['./ateliers.component.css']
})
export class AteliersComponent implements OnInit {

  ateliers: Atelier[] = [];

  loading = false;
  errorMessage = '';

  showDeleteConfirmation = false;
  isDeleting = false;

  selectedAtelier: Atelier | null = null;
  selectedAtelierTitle = '';







  showFormateurModal = false;

  formateurs: User[] = [];
  selectedFormateurId: number | null = null;
  selectedAtelierForFormateur: Atelier | null = null;

  loadingFormateurs = false;
  savingFormateur = false;
  formateurError = '';









  showParticipantsModal = false;
  participants: User[] = [];
  selectedAtelierForParticipants: Atelier | null = null;
  loadingParticipants = false;
  participantsError = '';







  constructor(
    private atelierService: AtelierService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAteliers();
  }

  // Charger la liste des ateliers
  loadAteliers(): void {
    this.loading = true;
    this.errorMessage = '';

    this.atelierService.getAteliers().subscribe({
      next: (data) => {
        this.ateliers = data;
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Impossible de charger les ateliers.';
        this.loading = false;
      }
    });
  }

  addAtelier(): void {
    this.router.navigate(['/admin/ateliers/ajouter']);
  }

  editAtelier(atelier: Atelier): void {
    if (atelier.id) {
      this.router.navigate(['/admin/ateliers/modifier', atelier.id]);
    }
  }

  deleteAtelier(atelier: Atelier): void {
    this.selectedAtelier = atelier;
    this.selectedAtelierTitle = atelier.titre;
    this.showDeleteConfirmation = true;
  }

  confirmDelete(): void {
    if (!this.selectedAtelier?.id) return;

    this.isDeleting = true;

    this.atelierService.deleteAtelier(this.selectedAtelier.id).subscribe({
      next: () => {
        this.isDeleting = false;
        this.showDeleteConfirmation = false;
        this.selectedAtelier = null;
        this.loadAteliers();
      },
      error: (error) => {
        console.error(error);
        this.isDeleting = false;
        this.errorMessage = 'Erreur lors de la suppression de l’atelier.';
      }
    });
  }

  cancelDelete(): void {
    this.showDeleteConfirmation = false;
    this.selectedAtelier = null;
    this.isDeleting = false;
  }




  // Ouvrir la fenêtre d'association
  openFormateurModal(atelier: Atelier): void {
    this.selectedAtelierForFormateur = atelier;
    this.selectedFormateurId = atelier.formateur_id ?? null;
    this.showFormateurModal = true;

    this.loadingFormateurs = true;
    this.formateurError = '';

    this.atelierService.getFormateurs().subscribe({
      next: (data) => {
        this.formateurs = data;
        this.loadingFormateurs = false;
      },
      error: (error) => {
        console.error(error);
        this.formateurError = 'Impossible de charger les formateurs.';
        this.loadingFormateurs = false;
      }
    });
  }



  // Enregistrer l'association f-a 
    saveFormateur(): void {
      if (!this.selectedAtelierForFormateur?.id || !this.selectedFormateurId) {
        this.formateurError = 'Veuillez sélectionner un formateur.';
        return;
      }

      this.savingFormateur = true;
      this.formateurError = '';

      this.atelierService.associerFormateur(
        this.selectedAtelierForFormateur.id,
        this.selectedFormateurId
      ).subscribe({
        next: () => {
          this.savingFormateur = false;
          this.showFormateurModal = false;
          this.selectedAtelierForFormateur = null;
          this.loadAteliers();
        },
        error: (error) => {
          console.error(error);
          this.savingFormateur = false;
          this.formateurError =
            error.error?.message || 'Erreur lors de l’association du formateur.';
        }
      });
    }


  closeFormateurModal(): void {
    this.showFormateurModal = false;
    this.selectedAtelierForFormateur = null;
    this.selectedFormateurId = null;
    this.formateurError = '';
  }






  
  openParticipantsModal(atelier: Atelier): void {
    this.selectedAtelierForParticipants = atelier;
    this.showParticipantsModal = true;
    this.loadingParticipants = true;
    this.participantsError = '';
    this.participants = [];

    this.atelierService.getParticipants(atelier.id!).subscribe({
      next: (data) => {
        this.participants = data;
        this.loadingParticipants = false;
      },
      error: (error) => {
        console.error(error);
        this.participantsError = 'Impossible de charger les participants.';
        this.loadingParticipants = false;
      }
    });
  }

  closeParticipantsModal(): void {
    this.showParticipantsModal = false;
    this.selectedAtelierForParticipants = null;
    this.participants = [];
    this.participantsError = '';
  }


}