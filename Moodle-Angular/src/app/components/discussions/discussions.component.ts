import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DiscussionService } from 'src/app/services/discussion.service';
import { UeService } from 'src/app/services/ue.service';

@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.css']
})
export class DiscussionsComponent implements OnInit {
  @Input() forums: any[] = [];
  id_ue: string | null = null;
  usersMap: { [id: string]: string } = {};
  userId = localStorage.getItem('userId');
  forumForm!: FormGroup;
  replyText: { [key: number]: string } = {};
  afficherReponses: boolean[] = [];
  afficherFormulaires: boolean[] = [];

  constructor(private route: ActivatedRoute, private ueService: UeService, private discussionService: DiscussionService, private fb: FormBuilder) {
    this.id_ue = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.forumForm = this.fb.group({
      message: ['', [Validators.required, Validators.minLength(3)]]
    });
    this.afficherReponses = this.forums.map(() => false);
    this.afficherFormulaires = this.forums.map(() => false);

    this.ueService.getUserData().subscribe(usersMap => {
      this.usersMap = Object.fromEntries(usersMap);
    });
  }

  // Affiche/masque les réponses (clic global)
  toggleReponses(index: number): void {
  this.afficherReponses = this.afficherReponses.map((_, i) => i === index ? !this.afficherReponses[i] : false);
  this.afficherFormulaires = this.afficherFormulaires.map(() => false);
}

  // Affiche uniquement le formulaire (sans propagation du clic global)
  toggleFormulaire(index: number, event: Event): void {
    event.stopPropagation();
    this.afficherFormulaires[index] = !this.afficherFormulaires[index];
  }

  getUserPrenom(userObj: any): string {
    const id = userObj?.$oid || userObj;
    return this.usersMap[id] || 'Utilisateur inconnu';
  }

  onSubmit(): void {
    if (this.forumForm.invalid) return;

    const messageContent = this.forumForm.value.message;
    const newForumMessage = {
      userId: this.userId,
      sujet: messageContent,
      datetime_publier: new Date().toISOString()
    };

    this.discussionService.ajouterForumMessage(this.id_ue, newForumMessage).subscribe({
      next: (res) => {
        this.forums.unshift(res);
        this.forumForm.reset();
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout du message', err);
      }
    });
  }

  getSortedReponses(reponses: any[]): any[] {
    return [...(reponses || [])].sort((a, b) =>
      new Date(b.datetime_publier).getTime() - new Date(a.datetime_publier).getTime()
    );
  }

  onReplySubmit(forumId: string, reply: string): void {
    if (!reply?.trim()) return;

    console.log('Replying to forum ID:', forumId, 'with message:', reply);

    this.replyText = { ...this.replyText, [forumId]: '' };
  }
}
