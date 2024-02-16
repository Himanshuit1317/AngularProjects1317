import { Component ,OnInit } from '@angular/core';
import { HttpService } from '../services/httpservice';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [HttpClientModule],
  providers: [HttpService],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  products: any[] = [];

  // 
  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.get_products();
  }

  get_products()
   {
    this.httpService.get('/products', {
      observe: 'response',
      responseType: 'json'
    }).subscribe((response: any) => {
      this.products = response.body;
    });
  }
}
