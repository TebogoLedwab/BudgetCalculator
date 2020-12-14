import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { savingsEntry } from '../Model/Entries';
import { BudgetService } from '../Service/BudgetService';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-income-list',
  templateUrl: './income-list.component.html',
  styleUrls: ['./income-list.component.css']
})
export class IncomeListComponent implements OnInit {
  closeResult = '';
  savingsEntry: savingsEntry[];
  timeLeft: number = 60;
  interval;
  modalReference: NgbModalRef;
  entryDate: Date;
  type: String;
  description: string;
  amount: number;
  //newSavings: any;

  dataModel: any = {};

  constructor(
    private budgetService: BudgetService,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.savingsEntry = this.budgetService.getSavings();
    this.startSavingsTimer();
  }

  // onSubmit(form : NgForm) {
    
  //     this.savingsEntry = new savingsEntry();
  //     this.savingsEntry.entryDate = this.dataModel.entryDate;
  //     this.savingsEntry.description = this.dataModel.description;
  //     this.savingsEntry.amount = this.dataModel.amount;
      
  //     this.budgetService.editSavings(this.savingsEntry);
    
  //   this.modalReference.close();

  // }

  startSavingsTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        this.savingsEntry = this.budgetService.getSavings();
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
    var index = this.savingsEntry.indexOf(data);
    this.savingsEntry.splice(index, 1);
    localStorage.setItem('savings', JSON.stringify(this.savingsEntry));
  }

//   Update(data){
//     //let updateItem = this.savingsEntry.find(this.findIndexToUpdate, newobj.id);
//     let index = this.savingsEntry.indexOf(data);
//           this.savingsEntry[1] = this.newSavings;
//           localStorage.setItem('savings', JSON.stringify(this.savingsEntry));
// }

}
