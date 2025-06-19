import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomPostService } from 'src/app/services/custom-post.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent{
  id_ue: string | null = null;
  @Input() devoirs: any[] = [];
  @Input() forums: any[] = [];
  // Ajouter Autres Sections
  newSectionName: string = '';
  @Input() customSections: string[] = [];
  @Input() customPosts: any[] = [];

  constructor(private route: ActivatedRoute, private customPostService: CustomPostService) {
    this.id_ue = this.route.snapshot.paramMap.get('id');
  }

  getPostsBySection(sectionName: string): any[] {
    return this.customPosts.filter(post => post.section === sectionName);
  }

  onSectionAdded() {
    const trimmedName = this.newSectionName.trim();
    if (!trimmedName) return;

    // Mettre en majuscule la premiere lettre
    const formattedName = trimmedName.charAt(0).toUpperCase() + trimmedName.slice(1).toLowerCase();

    const alreadyExists = this.customSections.some(
      section => section.toLowerCase() === formattedName.toLowerCase()
    );

    if (alreadyExists) {
      console.warn('Section éxiste déjà:', formattedName);
      this.showNotification('Section '+formattedName+' éxiste déjà', 'error');
      return;   // terminer la fonction
    }

    this.customPostService.addCustomSection(this.id_ue, formattedName).subscribe({
      next: (updatedSections) => {
        this.customSections = updatedSections;
        this.newSectionName = '';
        this.showNotification('Section créé avec succès : '+formattedName, 'success');
      },
      error: (err) => {
        console.error('Echec de l\'ajout de section:', err);
      }
    });
  }

  onDevoirAdded(newDevoir: any) {
    this.devoirs = [...this.devoirs, newDevoir];
    this.showNotification('Devoir ajoutée avec succès', 'success');
  }

  onDevoirAddError() {
    this.showNotification('Échec de l\'ajout du devoir', 'error');
  }

  onCustomAdded(newCustom: any) {
    this.customPosts = [...this.customPosts, newCustom];
    this.showNotification('Post ajouté avec succès', 'success');
  }

  onCustomAddError() {
    this.showNotification('Échec de l\'ajout du Post', 'error');
  }

  onCustomDeleted(deletedId: string) {
    this.customPosts = this.customPosts.filter(post => post._id !== deletedId);
    this.showNotification('Post supprimé avec succès', 'success');
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