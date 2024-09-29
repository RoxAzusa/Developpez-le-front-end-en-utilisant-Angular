import { Component, OnInit } from '@angular/core';
import { filter, map, Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = of([]);

  data: any;
  options: any;
totalJos!: number;
  totalCountries!: number;
  countries!: string[];
  olympics!: Olympic[];
  totalMedals!: number[];

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.dataFormating(this.olympics$);
  }

  dataFormating(olympics$: Observable<Olympic[]>) {
    olympics$
        .pipe(
            filter(olympicData => olympicData && olympicData.length > 0),
            map(olympicData => {
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
              }
            )
        )
      .subscribe(() => {
        this.chartInitialization(this.countries, this.totalMedals);
        });
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
                    label: (context: any) => {
                        const value = context.raw || 0;
                        return [`🎖️ ${value}`];
                    }
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
}
