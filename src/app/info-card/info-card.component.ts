import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { 
  forkJoin,
  take 
} from 'rxjs';

import { AuthService } from '../auth.service';
import { ServicesService } from '../services.service';
import { 
  catchError,
  throwError 
} from 'rxjs';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.css'],
})

export class InfoCardComponent {
  private accounts: any[] = [];
  private apiAccounts: any[] = [];

  combinedAccounts: any[] = [];
  expandedStates: boolean[] = [];

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private serv: ServicesService
  ) { }

  uid: string = '';

  ngOnInit(): void {
    this.uid = this.auth.getUID()!.toString();
    this.getDataByUserID(this.uid);

    // Debug
    // console.log('uid: ' + this.uid);
  }

  getDataByUserID(userID: string | null) {
    const data = new FormData();

    if (userID) {
      data.set('userID', userID);
      
      console.log(data.toString());
    }

    this.http
      .post<any[]>(environment.accounts_information, data)
      .subscribe(
        (Data) => {
        this.accounts = Data;

        this.filter();
      });
  }

  filter(): void {
    const requests = [];

    for (let i = 0; i < this.accounts.length; i++) {
      let API_BasicInfo =
        environment.basicInfo +
        '?summoner_name=' +
        encodeURIComponent(this.accounts[i].accIGN) +
        '&region=' +
        encodeURIComponent(this.accounts[i].accServer);

      requests.push(this.http.get<any[]>(API_BasicInfo));
      // console.log(API_BasicInfo);
    }

    forkJoin(requests).subscribe((results) => {
      this.apiAccounts = results;
      const secondaryRequests = [];

      for (let i = 0; i < this.accounts.length; i++) {
        let API_RankInfo =
          environment.rankedInfo +
          '?summoner_id=' +
          encodeURIComponent(this.apiAccounts[i].id) +
          '&region=' +
          encodeURIComponent(this.accounts[i].accServer);

        secondaryRequests.push(this.http.get<any[]>(API_RankInfo));
        // console.log(API_RankInfo);
      }

      forkJoin(secondaryRequests).subscribe((rankResults) => {
        for (let i = 0; i < rankResults.length; i++) {
          let summonerLevel = this.apiAccounts[i].summonerLevel;
          let summonerID = this.apiAccounts[i].id;
          let profileIconID = this.apiAccounts[i].profileIconId;
          let rank,
            rankTier,
            rankFlex,
            rankTierFlex,
            soloqWins,
            soloqLosses,
            soloqLP,
            flexqWins,
            flexqLosses,
            flexqLP;

          // console.log(rankResults);

          // Filter ranks
          if (rankResults[i].length > 0) {
            for (let j = 0; j < rankResults[i].length; j++) {
              if (rankResults[i][j].queueType === 'RANKED_SOLO_5x5') {
                rank = rankResults[i][j].tier;
                rankTier = rankResults[i][j].rank;

                soloqWins = rankResults[i][j].wins;
                soloqLosses = rankResults[i][j].losses;
                soloqLP = rankResults[i][j].leaguePoints;
              } else if (rankResults[i][j].queueType === 'RANKED_FLEX_SR') {
                rankFlex = rankResults[i][j].tier;
                rankTierFlex = rankResults[i][j].rank;

                flexqWins = rankResults[i][j].wins;
                flexqLosses = rankResults[i][j].losses;
                flexqLP = rankResults[i][j].leaguePoints;
              }
            }
          }

          let API_ChampionMastery =
            environment.masteryInfo +
            '?summoner_id=' +
            encodeURIComponent(this.apiAccounts[i].id) +
            '&region=' +
            encodeURIComponent(this.accounts[i].accServer);

          const championIds: any[] = [];
          const championPoints: any[] = [];
          const championLevels: any[] = [];
          const championNames: any[] = [];
          let champions: any[];

          this.http.get<any[]>(API_ChampionMastery)
            .pipe(take(3))
            .subscribe(
              (data) => {
                for (let k = 0; k < 3; k++) {
                  championIds.push(data[k].championId);
                  championPoints.push(data[k].championPoints);
                  championLevels.push(data[k].championLevel);

                  this.http.get<any>('http://ddragon.leagueoflegends.com/cdn/13.10.1/data/en_US/champion.json')
                    .subscribe(
                      (response: any) => {
                        champions = Object.values<any>(response.data);
                        let filter = champions.filter((obj) => {
                          if (obj.key == data[k].championId) {
                            let temp = obj.name.replace(
                              /[^a-zA-Z\s]/g, '').toLowerCase().replace(/\b\w/g, (firstChar: string) => firstChar.toUpperCase()
                              );

                            // debug
                            // console.log(this.accounts[i].accIGN + ' ' + temp)
                            championNames.push(temp);
                          }
                        });
                      });
                }
              });

          this.combinedAccounts.push({
            // crucial info
            userID: this.accounts[i].userID,
            summonerID: summonerID,
            accID: this.accounts[i].acc_id,
            forsale: this.accounts[i].acctosell,

            // basic info
            summonerLevel: summonerLevel,
            accIGN: this.accounts[i].accIGN,
            profileIconId: profileIconID,

            // credentials
            username: this.accounts[i].accUsername,
            password: this.accounts[i].accPassword,
            mail: this.accounts[i].accMail,
            mailPass: this.accounts[i].accPass,

            // currecny + champs
            champs: this.accounts[i].accChamps,
            primaryCurrency: this.accounts[i].accPriCurr,
            secondaryCurrency: this.accounts[i].accSecCurr,

            // acc types
            type:
              this.accounts[i].accLvlType === 'h'
                ? 'Handlevel'
                : this.accounts[i].accLvlType === 'b'
                  ? 'Botted'
                  : this.accounts[i].accLvlType,

            verification: (this.accounts[i].accVerification === '1'
              ? 'Verified'
              : (this.accounts[i].accVerification === '0'
                ? 'Unverified'
                : this.accounts[i].accVerification)),

            // acc server
            accServer:
              this.accounts[i].accServer === 'EUN1'
                ? 'EUNE'
                : this.accounts[i].accServer === 'EUW1'
                  ? 'EUW'
                  : this.accounts[i].accServer === 'NA1'
                    ? 'NA'
                    : this.accounts[i].accServer,

            // rank information
            rank: rank,
            rankFlex: rankFlex,
            rankTier: rankTier,
            rankTierFlex: rankTierFlex,
            soloqWins: soloqWins,
            soloqLosses: soloqLosses,
            soloqLP: soloqLP,
            flexqWins: flexqWins,
            flexqLosses: flexqLosses,
            flexqLP: flexqLP,

            // masteries
            championIds: championIds,
            championPoints: championPoints,
            championLevels: championLevels,
            championNames: championNames,
          });
        }

        // end
        this.serv.setLoading(false);
        this.expandedStates = new Array(this.combinedAccounts.length).fill(
          false
        );
      });

      console.log(this.combinedAccounts);
    });
  }

  // Filter decimal places in winrate
  getFormattedWinRate(wins: number, losses: number): any {
    const winRate = (wins / (wins + losses)) * 100;

    if (Number.isInteger(winRate)) {
      return winRate.toFixed(0);
    } else if (winRate == 0) {
      return null;
    } else {
      return winRate.toFixed(2);
    }
  }

  romanToLatin(romanNumeral: string): number {
    const romanNumerals: { [key: string]: number } = {
      I: 1,
      IV: 4,
      V: 5,
      IX: 9,
      X: 10,
      XL: 40,
      L: 50,
      XC: 90,
      C: 100,
      CD: 400,
      D: 500,
      CM: 900,
      M: 1000,
    };

    let result = 0;
    for (let i = 0; i < romanNumeral.length; i++) {
      const currentChar = romanNumeral[i];
      const currentValue = romanNumerals[currentChar];

      const nextChar = romanNumeral[i + 1];
      const nextValue = romanNumerals[nextChar];

      if (nextValue && currentValue < nextValue) {
        result -= currentValue;
      } else {
        result += currentValue;
      }
    }

    return result;
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

  removeCardItem(index: number) {
    this.combinedAccounts.splice(index, 1);
  }

  deleteAccount(accID: number, index: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    // Create the request body
    const body = new URLSearchParams();
    body.set('accID', accID.toString());

    this.http.post('https://spicysalmon.000webhostapp.com/deleteAccount.php', body.toString(), { headers })
      .pipe(
        catchError(error => {
          console.error('API Error:', error);

          return throwError('Something went wrong.');
        })
      )
      .subscribe(response => {
        console.log('API Response:', response);
      });

    this.removeCardItem(index);
  }
}