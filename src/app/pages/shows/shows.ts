import {Component, inject, signal} from '@angular/core';
import {ShowApi} from '../../services/show-api';
import {Show} from '../../models/show';
import {RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-shows',
  standalone:true,
  imports: [
    RouterLink, CommonModule,
  ],
  templateUrl: './shows.html',
  styleUrl: './shows.css'
})
export class Shows {
  private showApi =inject(ShowApi);

  shows = signal<Show[]>([])
  loading = signal<boolean>(true);
  placeholders = Array(30).fill(0);

  ngOnInit(){
    this.loadShows();
  }

  private loadShows(){
    this.showApi.getShows().subscribe({
      next:(shows)=>{
        this.shows.set(shows)
        this.loading.set(false)
      },
      error:(error)=>{
        console.error("Erreur chargement des shows:", error)
        this.loading.set(false)
      }
    })
  }

}
