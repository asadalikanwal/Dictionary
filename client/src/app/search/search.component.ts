import { Component, OnInit, Output } from '@angular/core';
import { SearchService } from '../_service/search.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {
  searchForm: FormGroup;
  // @Output() search
  // result: any;
  vocab: string;
  pronunciation: string;
  definitionList: any;

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
      .subscribe(data => {
        console.log('inside subscribe: ', data);
        // this.vocab = data.word;
        // this.pronunciation = this.result.pronunciation;
        // this.definitionList = this.result.results;
      })


  }
}
