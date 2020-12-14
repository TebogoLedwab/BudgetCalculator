import { Injectable } from '@angular/core';
import { savingsEntry } from '../Model/Entries';

@Injectable({
    providedIn: 'root',
  })
export class BudgetService{

  constructor() {
    console.log('BudgetService Works');
   }

   getSavings() {
     let savings = JSON.parse(localStorage.getItem('savings'));
     return savings;
   }

   getExpenses() {
    let expenses = JSON.parse(localStorage.getItem('expenses'));
    return expenses;
  }
  
   addSavings(newSavings) {
      let savings = JSON.parse(localStorage.getItem('savings'));
      savings.push(newSavings);
      localStorage.setItem('savings', JSON.stringify(savings));
   }

   addExpenses(newExpenses) {
    let expenses = JSON.parse(localStorage.getItem('expenses'));
    expenses.push(newExpenses);
    localStorage.setItem('expenses', JSON.stringify(expenses));
 }

 editSavings(editSavings){
  let savings = JSON.parse(localStorage.getItem('savings'));
  savings.push(editSavings);
  localStorage.setItem('savings', JSON.stringify(savings));
 }

 editExpenses(editExpenses){
  let expenses = JSON.parse(localStorage.getItem('expenses'));
  expenses.push(editExpenses);
  localStorage.setItem('expenses', JSON.stringify(expenses));
 }

}