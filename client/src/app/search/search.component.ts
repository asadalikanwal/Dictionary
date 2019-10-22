import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SearchService } from '../_service/search.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {
  searchForm: FormGroup;
  word;
  vocab: string;
  pronunciation: string;
  definitionList: any;
  @Output() emitMessage = new EventEmitter();


  constructor(private fb: FormBuilder, private searchSvc: SearchService) {

    this.searchForm = fb.group({
      'vocab': ['', [Validators.required]]
    })
  }

  onSearch() {
    console.log(this.searchForm.value);
    const searchWord = this.searchForm.value;
    console.log(searchWord);
    this.searchSvc.search(this.searchForm.value)
      .subscribe(res => {
        console.log('inside subscribe: ', res);
        if (res) {
          this.word = res;

          this.vocab = this.word.word;
          this.pronunciation = this.word.pronunciation.all;
          this.definitionList = this.word.results
          this.emitMessage.emit(this.searchForm.value);
          this.searchSvc.wordAdded.next({
            name: this.searchForm.value.vocab,
            priority: 10
          });
        }
      }, (err) => {
        console.log("No results ..!")
      })


  }
}
