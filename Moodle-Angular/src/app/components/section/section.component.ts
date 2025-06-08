import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent{
  @Input() id_ue: string | null = null;
  @Input() cours: any[] = [];
  @Input() ressources: any[] = [];
  @Input() devoirs: any[] = [];
  @Input() forums: any[] = [];

  onCoursAdded(newCours: any) {
    this.cours = [newCours, ...this.cours];
    this.showNotification('Cours ajouté avec succès', 'success');
  }

  onCoursAddError() {
    this.showNotification('Échec de l\'ajout du cours', 'error');
  }

  onRessourceAdded(newRessource: any) {
    this.ressources = [newRessource, ...this.ressources];
    this.showNotification('Ressource ajoutée avec succès', 'success');
  }

  onRessourceAddError() {
    this.showNotification('Échec de l\'ajout de la ressource', 'error');
  }

  onDevoirAdded(newDevoir: any) {
    this.devoirs = [newDevoir, ...this.devoirs];
    this.showNotification('Ressource ajoutée avec succès', 'success');
  }

  onDevoirAddError() {
    this.showNotification('Échec de l\'ajout de la ressource', 'error');
  }

  toastMessage = '';
  toastClass = 'bg-success';
  showToast = false;

  showNotification(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastClass = type === 'success' ? 'bg-success' : 'bg-danger';
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
}