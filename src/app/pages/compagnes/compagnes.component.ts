import { Component, ElementRef,ViewChild, OnInit } from '@angular/core';
import { AuthadminService } from 'src/app/services/authadmin.service';
import { AuthannonceurService } from 'src/app/services/authannonceur.service';
import { HttpClient } from '@angular/common/http';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-compagnes',
  templateUrl: './compagnes.component.html',
  styleUrls: ['./compagnes.component.css']
})
export class CompagnesComponent implements OnInit {
  @ViewChild('editBtn', { static: true, read: ElementRef })
  editBtnRef!: ElementRef<HTMLButtonElement>;

  compagnes: any[] = [];

  itemsPerPage = 5;
  currentPage = 1;
  searchText = '';

  nomcompagne: string = '';
  idcreator: string = '';
  description: string = '';
  date: string = '' ;

  constructor(private http: HttpClient, private elementRef: ElementRef,public shared: SharedService , private auth1: AuthannonceurService) { }

  ngOnInit(): void {

    this.auth1.getAllCampagnes().subscribe((data: any)=> {
      console.log(data);
    }, error =>{
      console.log(error);
    });
    

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }



  updateCampagne(nom: string, newName: string, newDescription: string) {
    this.auth1.updateCampagne(nom, newName, newDescription).subscribe(res => {
      console.log(res);
    });
  }
  
  deleteCampagne(nom: string) {
    this.auth1.deleteCampagne(nom).subscribe(res => {
      console.log(res);
    });
  }


  getPaginatedCompagnes() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    let filteredCompagnes = this.compagnes;
    if (this.searchText) {
      const searchTextLower = this.searchText.toLowerCase();
      filteredCompagnes = filteredCompagnes.filter(
        compagnes =>
        compagnes.nomcompagne.toLowerCase().includes(searchTextLower) ||
        compagnes.description.toLowerCase().includes(searchTextLower)
      );
    }
    return filteredCompagnes.slice(start, end);
  }

  getPaginationArray() {
    const totalPages = Math.ceil(this.compagnes.length / this.itemsPerPage);
    const paginationArray = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationArray.push(i);
    }
    return paginationArray;
  }

  getTotalPages() {
    return Math.ceil(this.compagnes.length / this.itemsPerPage);
  }

}

