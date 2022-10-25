import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-random-quote',
  templateUrl: './random-quote.component.html',
  styleUrls: ['./random-quote.component.scss']
})
export class RandomQuoteComponent implements OnInit, OnDestroy {
  quote?: Quote;
  fetchingQuoteInProgress: boolean;
  quoteSubscription?: Subscription;

  constructor(private httpClient: HttpClient) {
    this.fetchingQuoteInProgress = false;
  }

  ngOnInit(): void {
    this.randomQuote();
  }

  /**
   * Fetches random quote.
   */
  randomQuote(): void {
    this.fetchingQuoteInProgress = true;
    this.quoteSubscription = this.httpClient.get(`https://api.quotable.io/random`).subscribe(res => {
      this.quote = new Quote(res);
    });
    this.quoteSubscription.add(() => { this.fetchingQuoteInProgress = false; });
  }

  /**
   * Speaks the displayed quote.
   */
  utterQuote(): void {
    // const voices = window.speechSynthesis.getVoices();
    // the SpeechSynthesisUtterance is a web speech api that represents a speech request.
    let utterance = new SpeechSynthesisUtterance(`${this.quote?.content} by ${this.quote?.author}`);
    // utterance.voice = voices[4];
    speechSynthesis.speak(utterance); // speak method of speechSynthesis speaks the utterance.
  }

  /**
   * Copy displayed quote to clipboard.
   */
  copyQuote(): void {
    if (this.quote?.content) {
      // copies text to clipboard.
      navigator.clipboard.writeText(this.quote.content);
    } else {
      alert('Nothing found to copy');
    }
  }

  /**
   * Posts quote to twitter.
   */
  postOnTwitter(): void {
    const tweetUrl = `https://twitter.com/intent/tweet?url=${this.quote?.content}`;
    window.open(tweetUrl, '_blank'); // opens a new twitter tabl with passing quote in the url
  }

  ngOnDestroy(): void {
    this.quoteSubscription?.unsubscribe();
  }
}

/**
 * Represent quote class.
 */
class Quote {
  _id: string;
  author: string;
  authorSlug: string;
  content: string;
  dateAdded: Date;
  dateModified: Date;
  length: number;
  tags: Array<string>;

  constructor(args: any) {
    this._id = args._id;
    this.author = args.author;
    this.authorSlug = args.authorSlug;
    this.content = args.content;
    this.dateAdded = args.dateAdded;
    this.dateModified = args.dateModified;
    this.length = args.length;
    this.tags = args.tags;
  }
}
