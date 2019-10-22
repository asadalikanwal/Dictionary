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
  loading: boolean = false;
  resultFound: boolean = false;
  @Output() emitMessage = new EventEmitter();


  constructor(private fb: FormBuilder, private searchSvc: SearchService) {

    this.searchForm = fb.group({
      'vocab': ['', [Validators.required]]
    })
  }

  onSearch() {
    this.loading = true;
    console.log(this.searchForm.value);
    const searchWord = this.searchForm.value;
    console.log(searchWord);
    this.searchSvc.search(this.searchForm.value)
      .subscribe(res => {
        this.loading = false;
        console.log('inside subscribe: ', res);
        const result: any = res;
        if (result.success === false) {
          console.log("No results");
          this.word = '';
          this.resultFound = false;
        } else {
          console.log("Got Data of search");
          if (res) {
            this.resultFound = true;
            this.word = res;
            this.vocab = this.word.word;
            this.pronunciation = this.word.pronunciation.all;
            this.definitionList = this.word.results
            this.emitMessage.emit(this.searchForm.value);
            this.searchSvc.wordAdded.next({
              name: this.searchForm.value.vocab,
              priority: 10
            });
            console.log("Res is done");
          }
        }

      }, (err) => {
        this.loading = false;
        console.log("No results ..!")
      })


  }
}
