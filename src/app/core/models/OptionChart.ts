export interface OptionChart {
    maintainAspectRatio: boolean,
    aspectRatio?: number,
    plugins: {
        legend: {
            display?: boolean,
            labels?: {
                usePointStyle: boolean,
                color: string,
            }
        },
        tooltip?: {
            callbacks: {
                label: (context: { raw: number }) => string[]
            },
            backgroundColor: string,
            titleAlign: string,
            bodyAlign: string,
            bodyFont: { size: number },
            titleFont: { size: number},
            padding: number,
            displayColors: boolean
        }
    }
}
