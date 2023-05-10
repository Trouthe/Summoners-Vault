import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { reduce } from 'rxjs';

@Component({
  selector: 'app-rankinfo',
  templateUrl: './rankinfo.component.html',
  styleUrls: ['./rankinfo.component.css']
})
export class RankinfoComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  API_KEY: string = 'RGAPI-bed29b2d-e7fd-4c03-8f81-3e3900673079';
  searchText?: string;

  API_PlayerBasicInfo?: string; API_PlayerRank?: string;
  playerData: any; playerRank: any;

  selectedServer?: string;
  servers = [
    {label: 'EUNE', value: 'eun1'},
    {label: 'EUW', value: 'euw1'},
    {label: 'NA', value: 'na1'},
  ];

  showresult: boolean = false;
  isUnranked: boolean = true;

  public pieChartType: ChartType = 'pie';
  public pieChartData: ChartData<'pie'> = {
    labels: ['Losses', 'Wins', 'Total'],
    datasets: [{data: []}],
  };
  public pieChartOptions: ChartConfiguration ['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {color: 'white'}
      }
    }
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getPlayerData(name: string) {
    //g indicates that all matches should be replaced
    this.searchText = name.replace(/ /g, '%20');

    if (this.selectedServer == "") 
      this.selectedServer = this.servers[0].value;
    
    for (let s of this.servers) {
      if (s.label === this.selectedServer)
        this.selectedServer = s.value;
      break;
    }
    
    this.API_PlayerBasicInfo = 'https://'+ this.selectedServer +'.api.riotgames.com/lol/summoner/v4/summoners/by-name/' +
      this.searchText + '?api_key=' + this.API_KEY;

    this.http.get(this.API_PlayerBasicInfo).subscribe(BasicData => {
      this.playerData = BasicData;

      this.API_PlayerRank = 'https://' + this.selectedServer + '.api.riotgames.com/lol/league/v4/entries/by-summoner/' +
        this.playerData.id + '?api_key=' + this.API_KEY;

      this.http.get(this.API_PlayerRank).subscribe(RankedData => {
        if (RankedData != "") {
          this.playerRank = RankedData;
          this.filterRankedType();

          let totalWins = this.rankedSolo.wins + this.rankedFlex.wins;
          let totalLosses = this.rankedSolo.losses + this.rankedFlex.losses;

          this.pieChartData.datasets[0].data[1] = totalWins;
          this.pieChartData.datasets[0].data[0] = totalLosses;
          this.pieChartData.datasets[0].data[2] = totalWins + totalLosses;

          this.chart?.update();

          this.isUnranked = false;
        } else { 
          this.isUnranked = true;
        }
      });
    });

    if (name == "") {
      this.showresult = false;
    } else {
      this.showresult = true;
    }
  }

  rankedSolo: any;
  rankedFlex: any;
  filterRankedType():void {
    for (let i=0; i<2; i++) {
      if (this.playerRank[i].queueType === "RANKED_SOLO_5x5"){ 
        this.rankedSolo = this.playerRank[i];
       } else {
        this.rankedFlex = this.playerRank[i];
       }
    }
  }
}