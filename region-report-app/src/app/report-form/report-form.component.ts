import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { map, Observable, startWith } from 'rxjs';
import { Region, RegionInfo } from '../interfaces/region.interface';
import { RegionService } from '../services/region.service';

@Component({
  selector: 'app-report-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    NgxMatSelectSearchModule,
  ],
  templateUrl: './report-form.component.html',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  styleUrl: './report-form.component.scss',
})
export class ReportFormComponent implements OnInit {
  public reportForm: FormGroup;
  public regions: RegionInfo[] = [];

  public multiSearchControl = new FormControl('');
  public filteredMultiRegions: Observable<RegionInfo[]>;

  public singleSearchControl = new FormControl('');
  public filteredSingleRegions: Observable<RegionInfo[]>;

  constructor(
    private fb: FormBuilder,
    private regionService: RegionService,
  ) {
    this.reportForm = this.fb.group({
      multipleRegions: [[], [Validators.required, Validators.minLength(2)]],
      singleRegion: [null, Validators.required],
    });

    this.filteredMultiRegions = this.multiSearchControl.valueChanges.pipe(
      startWith(''),
      map((value: string | null): RegionInfo[] => this._filterRegions(value, this.regions)),
    );

    this.filteredSingleRegions = this.singleSearchControl.valueChanges.pipe(
      startWith(''),
      map((value: string | null): RegionInfo[] => this._filterRegions(value, this.regions)),
    );
  }

  public ngOnInit(): void {
    this.regionService.getRegions().subscribe((data: Region): void => {
      this.regions = data.data;
      this.multiSearchControl.setValue('');
      this.singleSearchControl.setValue('');
    });
  }

  public onSubmit(): void {
    console.log('Form Submitted', this.reportForm.value);
  }

  private _filterRegions(value: string | null, regions: RegionInfo[]): RegionInfo[] {
    if (!value) {
      return this.regions;
    }

    const filterValue = value.toLowerCase();
    return regions.filter((region) =>
      region.name.toLowerCase().includes(filterValue),
    );
  }

}
