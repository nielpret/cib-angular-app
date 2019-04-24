import { Component, OnInit } from '@angular/core';
import { CibService } from './services/cib.service';
import { Account } from './account.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Acme Bank';
  accounts: Account[] = [];
  balance: number = 0;
  balance_string: string = '0';
  constructor(private cibService: CibService) {

  }
  ngOnInit() {
    this.cibService.accounts().subscribe(data => {

      this.accounts = data as Account[];
      this.calculateBalance();
    })
  }
  canWithdraw(account: Account) {
    if (account.account_type === 'cheque' && account.balance > -500) {
      return true;
    } else if (account.account_type === 'savings' && account.balance > 0) {
      return true;
    }
    return false;
  }
  withdraw(account: Account) {
    /*
    Possibly bring up n modal or a new screen to indicate how much to withdraw.
     */
    if (this.canWithdraw(account)) {
      if (account.account_type === 'cheque') {
        account.balance = -500;
      } else if (account.account_type === 'savings') {
        account.balance = 0;
      }
      this.calculateBalance();
      alert('Success');
    }
  }
  calculateBalance() {
    let balance = 0;
    this.accounts.forEach(a => {
      balance += Number(a.balance * 100);
    });
    this.balance_string = (balance / 100).toFixed(2);
  }
  formatBalance(b) {
    if (b < 0) {
      return '-ZAR ' + (b * -1).toFixed(2);
    }
    return 'ZAR ' + parseFloat(b+'').toFixed(2);
  }
}
