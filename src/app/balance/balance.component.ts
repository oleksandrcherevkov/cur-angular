import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../shared/services/user/user.service';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements AfterViewInit {
  public adds = [
    {
      label: '30 minutes',
      value: 1800,
    },
    {
      label: '1 hour',
      value: 3600,
    },
    {
      label: '5 hours',
      value: 18000,
    },
    {
      label: '10 hours',
      value: 36000,
    },
  ]
  public selected = 0;
  @ViewChild(MatSelectionList) addsSelect!: MatSelectionList;
  public user$ = this.user.user$;
  constructor(private user: UserService) {
  }
  ngAfterViewInit(): void {
    this.addsSelect.selectionChange.subscribe((s: MatSelectionListChange) => {
      this.selected = s.options[0].value.value;
    });
  }
  submit() {
    this.user.addToBalance({ userId: this.user$.value!.id, amount: this.selected })
      .subscribe();
  }
}
