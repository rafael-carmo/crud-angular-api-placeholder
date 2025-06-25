import { Component } from '@angular/core';
import { ChartType, NgApexchartsModule } from "ng-apexcharts";
import { ItemService } from '../../services/item.service';

// export type ChartOptions = {
//   series: ApexAxisChartSeries;
//   chart: ApexChart;
//   xaxis: ApexXAxis;
//   // dataLabels: ApexDataLabels;
//   // grid: ApexGrid;
//   stroke: ApexStroke;
//   // title: ApexTitleSubtitle;
//   tooltip: ApexTooltip;
// };

export type PieOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-dashboard',
  imports: [
    NgApexchartsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

  totalItems: number | string = 0;

  chartOptions = {
    series: [{
      name: "Vendas",
      data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
    }],
    chart: {
      height: 350,
      type: 'line' as ChartType,
      zoom: {
        enabled: false
      }
    },
    stroke: {
      width: 4,
      curve: 'smooth' as const
    },
    xaxis: {
      categories: [
        "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
        "Jul", "Ago", "Set", "Out", "Nov", "Dez"
      ]
    },
    tooltip: {
      enabled: true,
      theme: "dark"
    },
    colors: ["#3498db"]
  };



  pieChartOptions = {
    series: [44, 55, 13, 43],
    chart: {
      type: 'donut' as const,
      height: 350
    },
    labels: ["Eletrônicos", "Roupas", "Acessórios", "Outros"],
    colors: ["#3498db", "#2ecc71", "#f39c12", "#e74c3c"]
  };

  constructor(private itemService: ItemService) {
    this.getNewClientes();
  }

  getNewClientes() {
    this.itemService.getItems().subscribe({
      next: (items) => {
        this.totalItems = items.totalElements;
      },
      error: (error) => {
        this.totalItems = 'Erro';
        console.log(error);
      }
    })
  }
}
