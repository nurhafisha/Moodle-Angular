import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { apiUrls } from 'src/app/backend_urls';
declare var bootstrap: any; 
@Component({
  selector: 'app-grade-devoir',
  templateUrl: './grade-devoir.component.html',
  styleUrls: ['./grade-devoir.component.css']
})
export class GradeDevoirComponent implements OnInit {
  searchText: string = '';
  filteredSubmissions: any[] = [];
  selectedSubmission: any = null;
  devoirTitre: string = '';
  expandedCommentIndex: number | null = null;
  submissions: any[] = []; // pour stocker les données de soumission de devoirs

  // sert pour breadcrumbs
  ueId : string | null = this.route.snapshot.paramMap.get('id');
  titre_ue : string | null = '';
  devoirId : any;

  constructor(private route: ActivatedRoute , private http: HttpClient) { }

  ngOnInit(): void {
    this.ueId = this.route.snapshot.paramMap.get('id');
    this.devoirId = this.route.snapshot.paramMap.get('devoirId');
    

    if (this.ueId && this.devoirId){
      this.http.get<any>(`${apiUrls.ue}${this.ueId}/devoirs/${this.devoirId}/grade-devoir`)
      .subscribe({
        next: (res) => {
          this.submissions = res.data;
          this.filteredSubmissions = [...this.submissions];
        },
        error: (err) => {
          console.error("Error fetching grading data", err);
        }
      })
    }

    // Get devoir title
    this.http.get<any>(`${apiUrls.ue}${this.ueId}/devoirs/${this.devoirId}`).subscribe({
      next: (res) => {
        this.devoirTitre = res.data.titre_devoir;
      },
      error: (err) => {
        console.error("Error fetching devoir title", err);
      }
    });

    // Get UE title (titre_ue)
    if (this.ueId) {
      this.http.get<any>(`${apiUrls.ue}${this.ueId}`).subscribe({
        next: (res) => {
          this.titre_ue = res.data.titre_ue;
        },
        error: (err) => {
          console.error("Error fetching UE title", err);
        }
      });
    }
  }

  // search-filtrer bar
    applyFilter() {
      const text = this.searchText.toLowerCase().trim();

      if (!text) {
        this.filteredSubmissions = [...this.submissions];
        return;
      }

      this.filteredSubmissions = this.submissions.filter(sub => 
        sub.id_etudiant.nom.toLowerCase().includes(text) ||
        sub.id_etudiant.prenom.toLowerCase().includes(text) ||
        (sub.etat ?? '').toLowerCase().includes(text) 
      );
    }

  openGradeModal(submission: any) {
    this.selectedSubmission ={...submission}; // pour cloner et eviter les modifications directes
  }

  saveGradingChanges() {


  if (!this.selectedSubmission || !this.selectedSubmission._id) {
    console.warn('No submission selected or missing _id');
    return;
  }
    const ueId = this.route.snapshot.paramMap.get('id');
    const devoirId = this.route.snapshot.paramMap.get('devoirId');
    const depotId = this.selectedSubmission._id ?? this.selectedSubmission.Object_id;

    if(!ueId || !devoirId || !depotId) return; // Assurez-vous que les IDs sont valides

    const updateData = {
      note: this.selectedSubmission.note,
      commentaire: this.selectedSubmission.commentaire,
      etat: this.selectedSubmission.etat
    };

    this.http.put<{ data: any }>(`${apiUrls.ue}${ueId}/devoirs/${devoirId}/depots/${depotId}`, updateData)
    .subscribe({
      next: (res) => {
        console.log("Grading updated successfully", res);
        

        //  Update the corresponding row in the table
        const index = this.submissions.findIndex(d => d._id === depotId || d.Object_id === depotId);
        if (index !== -1) {
          this.submissions[index] = { 
            ...this.submissions[index], 
            ...updateData 
          };
          this.filteredSubmissions = [...this.submissions]; // refresh filtered view
        }
      
      // Hide modal
        const modal = document.getElementById('gradeModal');
        if (modal) bootstrap.Modal.getInstance(modal)?.hide();

    },
    error: (err) => {
        console.error("Error updating grading", err);
        alert('Erreur lors de la mise à jour de la note. Veuillez réessayer.');
      }
    });
  } 

  toggleComment(index: number): void {
  this.expandedCommentIndex = this.expandedCommentIndex === index ? null : index;
  }
} 