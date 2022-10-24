import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fun-and-utilities';
  @ViewChild('contextMenu') contextMenu!: ElementRef<HTMLDivElement>;
  @ViewChild('shareMenu') shareMenu!: ElementRef<HTMLUListElement>;

  constructor(private router: Router) {
    document.addEventListener('contextmenu', (ev: MouseEvent) => {
      this.showContextMenu(ev);
    });

    document.addEventListener('click', (ev: MouseEvent) => {
      this.hideContextMenu(ev);
    })
  }

  /**
   * Displays context menu.
   * @param ev context menu mouse event
   */
  showContextMenu(ev: MouseEvent): void {
    ev.preventDefault(); // preventing default context menu of the browser.

    let x = ev.offsetX; // return x-coordinate of mouse.
    let y = ev.offsetY; // return y-coordinate of mouse.
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let contextMenuWidth = this.contextMenu.nativeElement.offsetWidth;
    let contextMenuHeight = this.contextMenu.nativeElement.offsetHeight;

    if (x > (windowWidth - contextMenuWidth - this.shareMenu.nativeElement.offsetWidth)) {
      this.shareMenu.nativeElement.style.left = '-200px';
    } else {
      this.shareMenu.nativeElement.style.left = '';
      this.shareMenu.nativeElement.style.right = '-200px';
    }

    x = x > windowWidth - contextMenuWidth ? windowWidth - contextMenuWidth : x;
    y = y > windowHeight - contextMenuHeight ? windowHeight - contextMenuHeight : y;

    this.contextMenu.nativeElement.style.left = `${x}px`;
    this.contextMenu.nativeElement.style.top = `${y}px`;
    this.contextMenu.nativeElement.style.visibility = Visibility.visible;
  }

  /**
   * Hides context menu.
   * @param ev mouse event.
   */
  hideContextMenu(ev: MouseEvent): void {
    this.contextMenu.nativeElement.style.visibility = Visibility.hidden;
  }

  /**
   * Navigates to the specified url.
   * @param url the url to navigate.
   */
  navigateTo(url: string): void {
    this.router.navigateByUrl(url);
  }

  /**
   * Reloads the same page.
   */
  refreshPage(): void {
    window.location.reload();
  }
}

class Visibility {
  static visible: string = 'visible';
  static hidden: string = 'hidden';
}
