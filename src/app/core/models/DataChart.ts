export interface DataChart {
    labels: string[];
    datasets: { 
        data: number[]; 
        backgroundColor: string[]; 
        hoverBackgroundColor: string[];
    }[]
}
