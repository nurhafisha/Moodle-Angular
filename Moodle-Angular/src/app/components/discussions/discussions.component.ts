import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
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
  @ViewChildren('replyTextarea') replyTextareas!: QueryList<ElementRef>;
  id_ue: string | null = null;
  userRole: string | null = null;
  usersMap: { [id: string]: string } = {};
  userId = localStorage.getItem('userId');
  forumForm!: FormGroup;
  replyForms: FormGroup[] = [];
  afficherReponses: boolean[] = [];
  afficherFormulaires: boolean[] = [];
  editModes: boolean[] = [];
  editForms: FormGroup[] = [];
  replyEditForms: FormGroup[][] = [];
  replyEditModes: boolean[][] = [];

  constructor(
    private route: ActivatedRoute,
    private ueService: UeService,
    private discussionService: DiscussionService,
    private fb: FormBuilder
  ) {
    this.id_ue = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.forumForm = this.fb.group({
      message: ['', [Validators.required, Validators.minLength(3)]]
    });
    this.userRole = localStorage.getItem('userRole');

    this.afficherReponses = this.forums.map(() => false);
    this.afficherFormulaires = this.forums.map(() => false);

    // Crée un Reactive Form pour chaque réponse
    this.replyForms = this.forums.map(() =>
      this.fb.group({
        reply: ['', Validators.required]
      })
    );

    this.ueService.getUserData().subscribe(usersMap => {
      this.usersMap = Object.fromEntries(usersMap);
    });

    this.editModes = this.forums.map(() => false);
    this.editForms = this.forums.map(forum =>
      this.fb.group({
        sujet: [forum.sujet, [Validators.required, Validators.minLength(3)]]
      })
    );

    this.replyEditForms = this.forums.map(forum =>
      (forum.reponses || []).map((rep: { message: any; }) =>
        this.fb.group({
          message: [rep.message, [Validators.required, Validators.minLength(1)]]
        })
      )
    );

    this.replyEditModes = this.forums.map(forum =>
      (forum.reponses || []).map(() => false)
    );
  }

  toggleReponses(index: number): void {
    this.afficherReponses = this.afficherReponses.map((_, i) => i === index ? !this.afficherReponses[i] : false);
    this.afficherFormulaires = this.afficherFormulaires.map(() => false);
  }

  toggleFormulaire(index: number, event: Event): void {
    event.stopPropagation();
    this.afficherFormulaires[index] = !this.afficherFormulaires[index];

    if (this.afficherFormulaires[index]) {
      setTimeout(() => {
        const textarea = this.replyTextareas.toArray()[index];
        if (textarea) {
          textarea.nativeElement.focus();
        }
      }, 0);
    }
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

        // Initialise les nouveaux états/formulaires après ajout
        this.afficherReponses.unshift(false);
        this.afficherFormulaires.unshift(false);
        this.replyForms.unshift(
          this.fb.group({ reply: ['', Validators.required] })
        );
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout du message', err);
      }
    });
  }

  onReplySubmit(forumId: string, index: number): void {
    const replyControl = this.replyForms[index].get('reply');
    if (!replyControl || replyControl.invalid) return;

    const replyMessage = replyControl.value;

    const newForumReply = {
      userId: this.userId,
      forumId: forumId,
      reply: replyMessage,
      datetime_publier: new Date().toISOString()
    };

    this.discussionService.ajouterForumReponse(this.id_ue, newForumReply).subscribe({
      next: (res) => {
        const f = this.forums.find((forum) => forum._id === forumId);
        if (f) {
          f.reponses = f.reponses || [];
          f.reponses.push(res);
          replyControl.reset();
        }
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout de réponse', err);
      }
    });
  }

  deleteForum(forumId: string, event: Event): void {
    event.stopPropagation();

    if (!confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) return;

    this.discussionService.supprimerForumMessage(this.id_ue, forumId).subscribe({
      next: () => {
        // Supprimez forum message de la liste de forums
        const index = this.forums.findIndex(f => f._id === forumId);
        if (index !== -1) {
          this.forums.splice(index, 1);
          this.afficherReponses.splice(index, 1);
          this.afficherFormulaires.splice(index, 1);
          this.replyForms.splice(index, 1);
        }
        console.log('Message forum supprimé avec succès');
      },
      error: (err) => {
        console.error("Erreur lors de la suppression du message", err);
      }
    });
  }

  deleteReply(forumId: string, replyId: string, forumIndex: number, event: Event): void {
    event.stopPropagation();

    if (!confirm('Êtes-vous sûr de vouloir supprimer cette réponse ?')) return;

    this.discussionService.supprimerForumReponse(this.id_ue, forumId, replyId).subscribe({
      next: () => {
        const forum = this.forums.find(f => f._id === forumId);
        if (forum && forum.reponses) {
          forum.reponses = forum.reponses.filter((r: any) => r._id !== replyId);
        }
      },
      error: (err) => {
        console.error("Erreur lors de la suppression de la réponse", err);
      }
    });
  }

  // edit forum message
  enableEditMode(index: number, event: Event): void {
    event.stopPropagation();
    this.editModes[index] = true;
    this.editForms[index].patchValue({ sujet: this.forums[index].sujet });
  }

  cancelEditMode(index: number): void {
    this.editModes[index] = false;
  }

  submitEdit(forumId: string, index: number): void {
    if (this.editForms[index].invalid) return;

    const updatedSujet = this.editForms[index].value.sujet;

    this.discussionService.editForumMessage(this.id_ue, forumId, { sujet: updatedSujet }).subscribe({
      next: (res) => {
        this.forums[index].sujet = updatedSujet;
        this.editModes[index] = false;
      },
      error: (err) => {
        console.error("Erreur lors de la modification du message", err);
      }
    });
  }

  // edit reply message
  enableReplyEditMode(forumIndex: number, replyIndex: number, event: Event): void {
    event.stopPropagation();
    this.replyEditModes[forumIndex][replyIndex] = true;
  }

  cancelReplyEditMode(forumIndex: number, replyIndex: number): void {
    this.replyEditModes[forumIndex][replyIndex] = false;
  }

  submitReplyEdit(forumId: string, replyId: string, forumIndex: number, replyIndex: number): void {
    const form = this.replyEditForms[forumIndex][replyIndex];
    if (form.invalid) return;

    const updatedMessage = form.value.message;

    this.discussionService.editForumReply(this.id_ue, forumId, replyId, { message: updatedMessage }).subscribe({
      next: () => {
        const rep = this.forums[forumIndex].reponses[replyIndex];
        if (rep) rep.message = updatedMessage;
        this.replyEditModes[forumIndex][replyIndex] = false;
      },
      error: (err) => {
        console.error("Erreur lors de la modification de la réponse", err);
      }
    });
  }


}