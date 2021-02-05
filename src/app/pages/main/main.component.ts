import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { select, Store } from '@ngrx/store';
import { selectCases } from '@app/store/cases/cases.selectors';
import { map, takeUntil } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ICountryStateAll } from '@app/models/cases/country';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatSort) sort: MatSort;

  public displayedColumns: string[] = ['country', 'population', 'confirmed', 'deaths', 'actions'];
  public dataSource: MatTableDataSource<ICountryStateAll>;
  public countries: ICountryStateAll[];

  public cases$ = this.store.pipe(select(selectCases)).pipe(
    map(list => Object.values(list)
      .filter(item => item.All.country)
      .map(state => state.All))
  );

  private destroy$ = new Subject();

  constructor(
    private api: ApiService,
    private store: Store
  ) {
  }

  ngOnInit(): void {
    this.cases$
      .pipe(takeUntil(this.destroy$))
      .subscribe(countries => {
        this.dataSource = new MatTableDataSource<ICountryStateAll>(countries);
      });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  parseCases() {
  }

  applyFilter($event: KeyboardEvent) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
