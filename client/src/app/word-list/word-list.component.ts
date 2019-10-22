import { Component, OnInit } from '@angular/core';
import { SearchService } from '../_service/search.service';
import { MatDialog } from '@angular/material';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';

@Component({
  selector: 'word-list',
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.css']
})
export class WordListComponent implements OnInit {
  words = [];
  constructor(private searchService: SearchService, public dialog: MatDialog) {
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

  search(word){
    console.log(word);
    this.searchService.search({vocab: word});
  }

  openDialog(word): void {
    this.searchService.search({vocab: word}).subscribe(data => {
      if (data) {
        console.log("All words", data);
        const dialogRef = this.dialog.open(MyDialogComponent, {
          data: data
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          // this.animal = result;
        });
      }
    }, (err) => {
      console.log("No words for this user", err);
      // this.toastr.error('Invalid username or password', 'Error');
    });

  }

  ngOnInit() {
    this.searchService.wordAdded.subscribe((data) => {
      this.words.push(data);
     });
  }

}
