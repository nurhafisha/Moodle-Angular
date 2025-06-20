import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DevoirService } from 'src/app/services/devoir.service';
import { UeService } from 'src/app/services/ue.service';
import { ViewChild, ElementRef } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-devoir-submission',
  templateUrl: './devoir-submission.component.html',
  styleUrls: ['./devoir-submission.component.css']
})
export class DevoirSubmissionComponent implements OnInit {
  @ViewChild('submissionModal') submissionModal!: ElementRef;
  // Route parametres
  ueId: string | null = null;
  devoirId: string | null = null;

  // Data Holders
  ueData: any = null;
  selectedDevoir: any = null;
  selectedDepot: any = null;

  // logic state
  timeRemaining: string = '';
  submitTime: string = '';
  status: string = '';
  selectedFile: File | null = null;
  submissionComment = '';
  userRole: string | null = null;
  submissionStatus = 'non soumis'; 

  // sert pour l'affichage breadcrumbs
  role: string | null = localStorage.getItem('userRole');

  constructor(
    private route: ActivatedRoute,
    private DevoirService: DevoirService,
    private UeService: UeService
  ) {}

ngOnInit(): void {
  // Extraire les paramètres de route
  this.ueId = this.route.snapshot.paramMap.get('id');
  this.devoirId = this.route.snapshot.paramMap.get('devoirId');
  this.userRole = localStorage.getItem('userRole');

  // Récupérer les données UE et devoir
  if (this.ueId && this.devoirId) {
    this.UeService.getUeData(this.ueId).subscribe({
      next: (res) => {
        console.log('UE response:', res);
        this.ueData = res;

        // Rechercher le devoir sélectionné dans la liste des devoirs
        if (this.ueData?.devoirs) {
          this.selectedDevoir = this.ueData.devoirs.find(
            (d: any) => d._id === this.devoirId
          );

          // pour calculer le temps restant
          if (this.selectedDevoir) {
            this.calculateTimeRemaining(this.selectedDevoir.datetime_fin);

            const userId = localStorage.getItem('userId');

            // Vérifiez si l'étudiant actuel a déjà soumis
            if (this.selectedDevoir.depots && userId) {
              
              const existingDepot = this.selectedDevoir.depots.find(
                (d: any) =>
                  d.id_etudiant?.toString() === userId ||
                  d.etudiant_id?.toString() === userId 
              );
              // Si oui, marquez comme 'soumis' et stockez le dépôt
              if (existingDepot) {
              this.submissionStatus = 'soumis';
              this.selectedDepot = existingDepot;

              const result = this.calculateSubmissionTime(
                existingDepot.datetime,
                this.selectedDevoir.datetime_fin
              );

              this.selectedDepot.earlyText = result.text;
              this.selectedDepot.earlyStatus = result.status;
              } else {
                this.submissionStatus = 'non soumis';
                this.selectedDepot = null;
              }
            }
          } else {
            console.warn('Devoir non trouvé dans cette UE');
          }
        } else {
          console.warn('Données ou devoirs UE non trouvés');
        }
      },
      error: (err) => {
        console.error("Erreur lors du chargement de l'UE :", err);
      }
    });
  }
}

// Fonction pour calculer le temps restant
  calculateTimeRemaining(due: string | Date): void {
    const now = new Date();
    const dueDate = new Date(due);
    const timeDiff = dueDate.getTime() - now.getTime();
    const status = '';

    if (timeDiff > 0) {
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      this.timeRemaining = `${days} jours, ${hours} heures, ${minutes} minutes`;
      this.status = 'Assignment';
    } else {
      const days = Math.floor(Math.abs(timeDiff) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((Math.abs(timeDiff) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((Math.abs(timeDiff) % (1000 * 60 * 60)) / (1000 * 60));
      this.timeRemaining = `${days} jours, ${hours} heures, ${minutes} minutes`;
      this.status = 'overdue';
    }
  }

  // Fonction pour calculer le temps soumis avant la date limite
   calculateSubmissionTime(submitTime: string | Date , deadline: string | Date): { text: string, status: string } {
    const submitDate = new Date(submitTime);
    const deadlineDate = new Date(deadline);
    const timeDiff = submitDate.getTime() - deadlineDate.getTime();;
    const absDiff = Math.abs(timeDiff);
    const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60));
if (timeDiff < 0) {
    return { text: `${days} jours, ${hours} heures ${minutes} minutes`, status: 'Avance' }; // Early
  } else {
    return { text: `${days} jours, ${hours} heures ${minutes} minutes`, status: 'Retard' }; // Late
  }
}


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  OnsubmitDepot() {
    if (!this.selectedFile) {
      alert('Veuillez sélectionner un fichier à soumettre.');
      return;
    }

    this.DevoirService.submitDepot(
      this.ueId,
      this.devoirId,
      this.selectedFile,
      this.submissionComment,
    ).subscribe({  
      next: (res) => {
        alert('Soumission réussie !');

        this.selectedFile = null;
        this.submissionComment = '';

          const modalEl = this.submissionModal.nativeElement;
          const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
          modalInstance.hide();

          this.submissionStatus = 'soumis'
      },
      error: (err) => {
        console.error('Soumission échouée :', err);
        alert('Soumission échouée. Veuillez réessayer.');
      }
    });
  }
}