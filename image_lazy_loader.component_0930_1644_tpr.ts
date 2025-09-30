// 代码生成时间: 2025-09-30 16:44:36
 * It observes the Intersection Observer API to determine when an image
 * enters the viewport and then loads it.
 */
import { Component, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-image-lazy-loader',
  template: `
    <img *ngIf="!loaded; else loadedTemplate" [src]="placeholder" />
    <ng-template #loadedTemplate>
      <img [src]="src" />
    </ng-template>
  `,
  styleUrls: ['./image_lazy_loader.component.css']
})
export class ImageLazyLoaderComponent implements OnInit {
  @Input() src: string;
  @Input() placeholder: string;
  loaded: boolean = false;
  observer: IntersectionObserver;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    // Create an Intersection Observer to watch for when the image is in the viewport
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage();
        }
      });
    }, {
      rootMargin: '0px',
      threshold: 0.1
    });

    // Observe the element when it is initialized
    this.observer.observe(this.el.nativeElement);
  }

  // Load the image by setting the src attribute
  loadImage(): void {
    if (this.loaded) return;
    this.renderer.setAttribute(this.el.nativeElement, 'src', this.src);
    this.loaded = true;
    this.observer.unobserve(this.el.nativeElement);
  }

  // Clean up the observer when the component is destroyed
  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
