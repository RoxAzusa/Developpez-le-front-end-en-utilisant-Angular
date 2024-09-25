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
  public olympics$: Observable<any> = of(null);

  data: any;
  options: any;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();

    this.olympics$
        .pipe(
            filter(olympicData => olympicData && olympicData.length > 0),
            map(olympicData => {
                const countries = olympicData.map((item: Olympic) => item.country);
                const totalMedals = olympicData.map((item: Olympic) => item.participations.reduce((total: number, participation: Participation) => total + participation.medalsCount, 0));
                return { countries, totalMedals };
              }
            )
        )
        .subscribe(({ countries, totalMedals }) => {
          this.chartInitialization(countries, totalMedals);
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
