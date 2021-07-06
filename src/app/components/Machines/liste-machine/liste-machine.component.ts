import { Component, OnInit, ViewChild } from '@angular/core';
import { MachineService } from 'src/app/core/services/machine.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatPaginator} from '@angular/material/paginator';


@Component({
  selector: 'app-liste-machine',
  templateUrl: './liste-machine.component.html',
  styleUrls: ['./liste-machine.component.scss']
})
export class ListeMachineComponent implements OnInit {
  listeMachine: any;
  pageSize = 10;
  filter:any;
  pageSizeOptions: number[] = [10, 25, 50, 100];
  pageFirstRow: number;
  rowsPerPage: number;
  pageLastRow: number;
  displayedList: any = [];
  filteredList: any = [];
  @ViewChild('paginator', { static: false }) paginator: MatPaginator;

  constructor(private machineService: MachineService) { }

  ngOnInit(): void {
    this.filter = {
      date: '',
      frequence: '',
      debit: '',
      alimentation: '',
      saturation: ''
    }
    this.getMachines();

  }


  getMachines() {
    this.rowsPerPage = 10;
    this.pageFirstRow = 0;
    this.pageLastRow = (this.pageFirstRow + this.rowsPerPage) - 1;
    this.machineService.getAllMachines().subscribe(data=>{
      this.listeMachine= [];
      //this.listeMachine=data;
      data.forEach((machine, index) => {
        this.listeMachine.push({
          
          id: machine.id,
          date: machine.purchase_date,
          frequence: machine.frequency,
          debit: machine.debit,
          alimentation: machine.alimentation,
          saturation: machine.saturation
        });
      })
      this.filteredList = this.listeMachine;
      this.displayedList = this.filteredList.slice(0, this.pageSize);
      let pageIndex = 0;
      console.log(this.listeMachine);
      console.log(this.filteredList);
      console.log(this.displayedList);


    });
  }

  loadFilter() {
    this.filteredList = this.listeMachine.filter((element) => this.filterCheck(element));
    this.displayedList = this.filteredList.slice(0, this.pageSize);
    this.paginator.firstPage();
  }

  filterCheck(element): boolean {
    let dateEvaluation = true;
    let frequencyEvaluation = true;
    let debitEvaluation = true;
    let alimentationEvaluation = true;
    let saturationEvaluation = true;
    if (this.filter.frequence != null) {
      frequencyEvaluation = element.frequence && element.frequence.toString().includes(this.filter.frequence);
    }
    if (this.filter.debit != null) {
      debitEvaluation = element.debit && element.debit.toString().includes(this.filter.debit);
    }
    if (this.filter.alimentation != null) {
      alimentationEvaluation = element.alimentation && element.alimentation.toString().includes(this.filter.alimentation);
    }
    if (this.filter.saturation != null) {
      saturationEvaluation = element.saturation && element.saturation.toString().includes(this.filter.saturation);
    }
    if (this.filter.date) {
      element.date.setHours(0, 0, 0, 0);
      dateEvaluation = element.date && element.date.getTime() === new Date(this.filter.date).getTime();
    }
    return frequencyEvaluation && debitEvaluation && alimentationEvaluation && saturationEvaluation && dateEvaluation;
  }


  showTwo(i) {
    if (i < 2) return true;
    return false;
  }

  paginate(event) {
    this.rowsPerPage = event.rows;
    this.pageFirstRow = event.first;
    this.pageLastRow = (this.pageFirstRow + this.rowsPerPage) - 1;

  }
  onPageChange($event) {
    this.pageSize = $event.pageSize
    this.filteredList = this.listeMachine.filter((element) => this.filterCheck(element));
    this.displayedList = this.filteredList.slice($event.pageIndex * $event.pageSize,
      $event.pageIndex * $event.pageSize + $event.pageSize);
  }

}