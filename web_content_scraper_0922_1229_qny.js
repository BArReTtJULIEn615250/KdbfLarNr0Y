// 代码生成时间: 2025-09-22 12:29:20
// Import required modules
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebContentScraperService {

  constructor(private http: HttpClient) {
  }

  /**
   * Fetches web content from the specified URL
   * @param url The URL of the webpage to scrape
   * @returns Promise<string> The fetched HTML content
   */
  public fetchContent(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.get(url, {
        responseType: 'text'
      }).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => {
          console.error('Error fetching content:', err);
          reject(err);
        }
      });
    });
  }
}


/*
 * Web Content Scraper Component
 * @description This component uses the WebContentScraperService to display web content.
 */
import { Component, OnInit } from '@angular/core';
import { WebContentScraperService } from './web-content-scraper.service';

@Component({
  selector: 'app-web-content-scraper',
  template: `
    <div *ngIf="content; else loadingTemplate">
      <h2>Web Content:</h2>
      <pre>{{ content }}</pre>
    </div>
    <ng-template #loadingTemplate>
      <p>Loading...</p>
    </ng-template>
  `,
  styles: []
})
export class WebContentScraperComponent implements OnInit {
  content?: string;
  error?: any;

  constructor(private scraperService: WebContentScraperService) {
  }

  ngOnInit() {
    this.fetchWebContent();
  }

  /**
   * Fetches web content and updates the component's state
   */
  private fetchWebContent(): void {
    this.scraperService
      .fetchContent('https://example.com')
      .then((content) => {
        this.content = content;
      })
      .catch((error) => {
        this.error = error;
      });
  }
}
