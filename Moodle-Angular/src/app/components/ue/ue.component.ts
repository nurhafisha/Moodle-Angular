import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ue',
  templateUrl: './ue.component.html',
  styleUrls: ['./ue.component.css']
})
export class UeComponent implements OnInit {
  @Input() ue: any;
  userId = localStorage.getItem('userId');
  userRole = localStorage.getItem('userRole');
  progressionPercentage: number | null = null;

  ngOnInit() {
    console.log(this.ue);
    this.calculateProgression();
  }

  calculateProgression(): void {
    if (!this.ue?.devoirs || this.ue.devoirs.length === 0) {
      this.progressionPercentage = null;
      return;
    }

    // Calculer le nombre de devoirs soumis
    const total = this.ue.devoirs.length;
    const completedDevoirs = this.ue.devoirs.filter((devoir: any) =>
      devoir.depots?.some((depot: any) => depot.id_etudiant === this.userId)
    ).length;

    this.progressionPercentage = Math.round((completedDevoirs / total) * 100);
  }
}
