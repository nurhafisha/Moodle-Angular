import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { apiUrls } from 'src/app/backend_urls';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent{
  ueId: string | null = null;
  userRole: string | null = null;
  rootUrl: string = apiUrls.root;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.ueId = this.route.snapshot.paramMap.get('id');
    this.userRole = localStorage.getItem('userRole');
  }
}
