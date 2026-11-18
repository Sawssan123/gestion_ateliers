import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormateurService } from '../../../services/formateur.service';
import { Atelier } from '../../../models/atelier.model';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-mes-atelier',
  templateUrl: './mes-atelier.component.html',
  styleUrls: ['./mes-atelier.component.css']
})
export class MesAtelierComponent implements OnInit {

  ateliers: Atelier[] = [];
  participants: User[] = [];

  formateurId!: number;

  showParticipantsModal = false;
  selectedAtelier: Atelier | null = null;

  loading = false;
  loadingParticipants = false;

  errorMessage = '';
  participantsError = '';

  constructor(
    private route: ActivatedRoute,
    private formateurService: FormateurService
  ) {}

  ngOnInit(): void {
    this.formateurId = Number(this.route.snapshot.paramMap.get('id'));

    if (!this.formateurId || this.formateurId <= 0) {
      this.errorMessage = 'ID du formateur invalide.';
      return;
    }

    this.loadAteliers();
  }

  loadAteliers(): void {
    this.loading = true;
    this.errorMessage = '';

    this.formateurService.getMesAteliers(this.formateurId).subscribe({
      next: (data) => {
        this.ateliers = data;
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Impossible de charger vos ateliers.';
        this.loading = false;
      }
    });
  }

  // Afficher les participants d'un atelier
  openParticipantsModal(atelier: Atelier): void {
    this.selectedAtelier = atelier;
    this.showParticipantsModal = true;
    this.loadingParticipants = true;
    this.participantsError = '';
    this.participants = [];

    this.formateurService.getMesParticipants(this.formateurId).subscribe({
      next: (data) => {
        const resultat = data.find(p => p.atelier_id === atelier.id);

        this.participants = resultat?.participants || [];
        this.loadingParticipants = false;
      },
      error: (error) => {
        console.error(error);
        this.participantsError = 'Impossible de charger les participants.';
        this.loadingParticipants = false;
      }
    });
  }

  // Fermer la fenêtre
  closeParticipantsModal(): void {
    this.showParticipantsModal = false;
    this.selectedAtelier = null;
    this.participants = [];
    this.participantsError = '';
  }
}