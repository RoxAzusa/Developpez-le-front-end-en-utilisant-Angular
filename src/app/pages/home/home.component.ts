import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, Observable, of } from 'rxjs';
import { DataChart } from 'src/app/core/models/DataChart';
import { Olympic } from 'src/app/core/models/Olympic';
import { OptionChart } from 'src/app/core/models/OptionChart';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = of([]);

  data!: DataChart;
  options!: OptionChart;
  totalJos!: number;
  totalCountries!: number;
  countries!: string[];
  olympics!: Olympic[];
  totalMedals!: number[];
  isLoading = true;

  constructor(private olympicService: OlympicService,
              private router: Router) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();

    this.olympics$
      .pipe(
        filter(olympicData => olympicData && olympicData.length > 0)
      )
      .subscribe({
        next: olympicData => {
          this.formatingData(olympicData);
          this.isLoading = false;
        },
        error: () => {
          this.router.navigate(['/error']);
        }
      });
  }
  
  formatingData(olympicData: Olympic[]) {
          this.olympics = olympicData;
          this.countries = olympicData.map((item: Olympic) => item.country);
          this.totalMedals = olympicData.map((item: Olympic) => item.participations.reduce((total: number, participation: Participation) => total + participation.medalsCount, 0));
          this.totalJos = new Set(
            olympicData
              .map((item: Olympic) => item.participations)
              .reduce((allParticipations: Participation[], currentParticipations: Participation[]) => allParticipations.concat(currentParticipations), [])
              .map((participation: Participation) => participation.year)
            ).size;
            this.totalCountries = this.countries.length;
    
        this.chartInitialization(this.countries, this.totalMedals);
  }

  chartInitialization(countries: string[], totalMedals: number[]) {
    this.data = {
      labels: countries,
      datasets: [
        {
          data: totalMedals,
          backgroundColor: ['#793d52', '#89a1db', '#9780a1', '#b8cbe7', '#956065'],
          hoverBackgroundColor: ['#8d4a62', '#9cb1e0', '#a18ba8', '#c3d3eb', '#a06d74']
        }
      ]
    };
    
    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: '#000000'
          }
        },
        tooltip: {
          callbacks: {
            label: (context: {raw: number}) => {return [`🎖️ ${context.raw || 0}`];}
          },
          backgroundColor: '#04838f',
          titleAlign: 'center',
          bodyAlign: 'center',
          bodyFont: { size: 16 },
          titleFont: { size: 18},
          padding: 10,
          displayColors: false
        }
      }
    };
  }
  
  onDetailChart(index: number) {
    this.router.navigateByUrl(`detail/${this.olympics[index].id}`);
  }
}
