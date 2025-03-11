import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect, MatSelectModule } from '@angular/material/select';
import { Region, RegionInfo } from '../interfaces/region.interface';
import { RegionService } from '../region.service';

@Component({
  selector: 'app-report-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    // NgForOf,
    // NgIf,
  ],
  templateUrl: './report-form.component.html',
  standalone: true,
  styleUrl: './report-form.component.scss',
})
export class ReportFormComponent {
  reportForm: FormGroup;
  regions: RegionInfo[] = [];
  selectedRegions: RegionInfo[] = [];
  selectedSingleRegion: RegionInfo | null = null;

  constructor(
    private fb: FormBuilder,
    private regionService: RegionService
  ) {
    this.reportForm = this.fb.group({
      multipleRegions: [[], [Validators.required, Validators.minLength(2)]],
      singleRegion: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.regionService.getRegions().subscribe(data => {
      this.regions = data.data;
    });
  }

  onMultipleSelect(regions: RegionInfo[]): void {
    this.selectedRegions = regions;
    this.reportForm.get('multipleRegions')?.setValue(regions);
  }

  onSingleSelect(region: RegionInfo): void {
    this.selectedSingleRegion = region;
    this.reportForm.get('singleRegion')?.setValue(region);
  }

  onSubmit(): void {
    if (this.reportForm.valid) {
      console.log('Form Submitted', this.reportForm.value);
    }
  }

}
