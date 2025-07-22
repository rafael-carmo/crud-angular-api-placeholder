import { Component, OnInit } from '@angular/core';
import { ChartType, NgApexchartsModule } from "ng-apexcharts";
import { ItemService } from '../../services/item.service';
import { ViaturaService } from '../../services/viatura/viatura.service';

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

export type TipoAbastecimento = {
  tipoAbastecimento: string;
  quantidade: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [
    NgApexchartsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit{

  totalItems: number | string = 0;
  totalViaturas: number | string = 0;
  series: number[] = [];
  labels: string[] = [];

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

  constructor(private itemService: ItemService,
      private viaturaService: ViaturaService
  ) {
    this.getNewClientes();
    this.getTotalViaturas();
  }
  ngOnInit(): void {
    this.getSeries();
  }

  getTotalViaturas() {
    this.viaturaService.getTotalViaturas().subscribe({
      next: (total) => {
        console.log(`total viaturas: ${total}`);
        this.totalViaturas = total;
      },
      error: (error) => {
        this.totalViaturas = 'Erro';
        console.log(error);
      }
    })
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

  getSeries() {
    this.viaturaService.getTotalByTipoAbastecimento().subscribe({
      next: (items: TipoAbastecimento[]) => {
        // console.log(`Graficos dados: ${items.tipoAbastecimento} - ${items.quantidade}`);
        this.series = items.map((item: { tipoAbastecimento: string; quantidade: number; }) => item.quantidade);
        this.labels = items.map((item: { tipoAbastecimento: string; quantidade: number; }) => item.tipoAbastecimento || 'Não especificado');

        console.log(`Series: ${this.series}`);
        console.log(`Labels: ${this.labels}`);
        // Atualiza as opções do gráfico de pizza
        // this.pieChartOptions = {
        //   series: this.series,
        //   chart: {
        //     type: 'donut' as const,
        //     height: 350
        //   },
        //   labels: this.labels,
        //   colors: ["#3498db", "#2ecc71", "#f39c12", "#e74c3c"]
        // };

        this.pieChartOptions.series = this.series;
        this.pieChartOptions.labels = this.labels;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
