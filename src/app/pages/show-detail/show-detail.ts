import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ShowApi} from '../../services/show-api';
import { Show } from '../../models/show';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-show-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './show-detail.html',
  styleUrl: './show-detail.css'
})
export class ShowDetail implements OnInit {

  private route = inject(ActivatedRoute);
  private showApi =inject(ShowApi);

  show = signal<Show | null>(null)
  loading = signal<boolean>(true);

  ngOnInit() {
    const showId = this.route.snapshot.params['id'];
    if (showId) {
      this.loadShow(+showId);
    }
  }

  private loadShow(id: number) {
    this.showApi.getShow(id).subscribe({
      next: (show) => {
        this.show.set(show);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Erreur lors du chargement du show-detail:', error);
        this.show.set(null);
        this.loading.set(false);
      }
    });
  }


}
