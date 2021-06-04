import { Component, EventEmitter, OnInit , Output} from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  private navInit: boolean = true;

  @Output() hrefID = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
    document.getElementById('btn')?.addEventListener('click', function() {
      if (this.className == 'displayCollapse on') this.classList.remove('on');
      else this.classList.add('on');
    });

    window.addEventListener("scroll", function() {
      var header = document.getElementById('nav');
      
      if(window.scrollY > 50){
        header?.classList.remove('navBg')
        header?.classList.add('sticky')
      }
      else{
        header?.classList.remove('sticky')
        header?.classList.add('navBg')
      }

      /*header?.classList.toggle('sticky', window.scrollY > 5);*/
    })
  }

  OpenMobileNavigation() {
    this.navInit = !this.navInit;

    //Close Side Nav Scroll
    if(this.navInit){
      document.getElementById('collapseBtn')?.classList.remove('hideElement', 'rotateToClose');
      document.getElementById('collapseBtn')?.classList.add('navInitAnim', 'rotateToOpen');
    }
    //Open Side Nav Scroll
    else{
      document.getElementById('collapseBtn')?.classList.remove('navInitAnim', 'rotateToOpen', 'hide-minus');
      document.getElementById('collapseBtn')?.classList.add('hideElement', 'rotateToClose', 'hide-bar');
    }
  }

  SelectNavigation(href: string){
    this.hrefID.emit(href);
  }
}
