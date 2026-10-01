interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  currency: 'HUF' | string; // Ha a HUF fix, érdemes lehet string literált használni
  stock: number;
  rating: number;
  active: boolean;
  description: string;
  image: string;
}

class ProductController implements Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  currency: 'HUF' | string; // Ha a HUF fix, érdemes lehet string literált használni
  stock: number;
  rating: number;
  active: boolean;
  description: string;
  image: string;
  constructor(id: number, name: string, category: string, brand: string, price: number, currency: 'HUF' | string, stock: number, rating: number, active: boolean, description: string, image: string) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.brand = brand;
    this.price = price;
    this.currency = currency;
    this.stock = stock;
    this.rating = rating;
    this.active = active;
    this.description = description;
    this.image = image;
  }

}
 
