import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, Observable, of } from 'rxjs';
import { DataChart } from 'src/app/core/models/DataChart';
import { Olympic } from 'src/app/core/models/Olympic';
import { OptionChart } from 'src/app/core/models/OptionChart';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrl: './detail-page.component.scss'
})
export class DetailPageComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = of([]);
  
  data!: DataChart;
  options!: OptionChart;
  idCountry!: number;
  olympicDetail!: Olympic[];
  numberEntries!: number;
  totalMedals!: number;
  totalAthletes!: number;
  countryName!: string;
  participationsJo!: string[];
  medalsJo!: number[];
  
  constructor(private olympicService: OlympicService,
              private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.idCountry = this.route.snapshot.params["idCountry"];
    this.olympics$ = this.olympicService.getOlympics();
    this.formatingData(this.olympics$);
  }
  
  formatingData(olympics$: Observable<Olympic[]>) {
    olympics$.pipe(
      filter(olympicData => olympicData && olympicData.length > 0),
      map(olympicData =>{ 
        this.olympicDetail = olympicData.filter(
          (item: Olympic) => item.id == this.idCountry
        );
        this.participationsJo = this.olympicDetail[0].participations.map((item: Participation) => item.city);
        this.medalsJo = this.olympicDetail[0].participations.map((item: Participation) => item.medalsCount);
        this.countryName = this.olympicDetail[0].country;
        this.numberEntries = this.olympicDetail[0].participations.length;
        this.totalMedals = this.medalsJo.reduce((allMedals: number, medal: number) => allMedals + medal, 0);
        this.totalAthletes = this.olympicDetail[0].participations.map((item: Participation) => item.athleteCount).reduce((allAthletes: number, athlete: number) => allAthletes + athlete, 0);
      })
    )
    .subscribe(() => {
      this.chartInitialization(this.participationsJo, this.medalsJo);
    });
  }
  
  chartInitialization(participationsJo: string[], medalsJo: number[]) {
    this.data = {
      labels: participationsJo,
      datasets: [
        {
          data: medalsJo,
          backgroundColor: ['#793d52', '#89a1db', '#9780a1'],
          hoverBackgroundColor: ['#8d4a62', '#9cb1e0', '#a18ba8']
        }
      ]
    };
    
    this.options = {
      plugins: {
        legend: {
          display: false
        }
      }
    };
  }
}
