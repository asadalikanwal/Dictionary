import { Component, OnInit } from '@angular/core';
import { SearchService } from '../_service/search.service';

@Component({
  selector: 'word-list',
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.css']
})
export class WordListComponent implements OnInit {
  words
  constructor(private searchService: SearchService) {
    this.searchService.getAllWords().subscribe(data => {
      if (data) {
        console.log("All words", data);
        this.words = data.words;
      }
    }, (err) => {
      console.log("No words for this user", err);
      // this.toastr.error('Invalid username or password', 'Error');
    });
  }

  addWord(word){
    this.words.push({
      name: word,
      priority: 10
    })
  }

  ngOnInit() {
    this.searchService.wordAdded.subscribe((data) => {
      this.words.push(data);
     });
  }

}
