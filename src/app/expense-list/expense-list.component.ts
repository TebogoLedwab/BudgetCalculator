import { Component, OnInit } from '@angular/core';
import { espenseEntry } from '../Model/Entries';
import { BudgetService } from '../Service/BudgetService';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {
  expenseEntry: espenseEntry[];
  timeLeft: number = 60;
  interval;
  dataModel: any = {};

  closeResult = '';

  modalReference: NgbModalRef;
  entryDate: Date;
  type: String;
  description: string;
  amount: number;


  constructor(
    private budgetService: BudgetService,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.expenseEntry = this.budgetService.getExpenses();
    this.startTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        this.expenseEntry = this.budgetService.getExpenses();
      } else {
        this.timeLeft = 60;
      }
    },1000)
  }

  openModal(content){
    this.modalReference = this.modalService.open(content);
      this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
  this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  open(content) {
     this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  Delete(data){
    var index = this.expenseEntry.indexOf(data);
    this.expenseEntry.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(this.expenseEntry));
  }

}
