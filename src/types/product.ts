// productTypes.ts

interface ProductDimensions {
  width: number;
  height: number;
  depth: number;
}

interface ProductReview {
  rating: number;
  comment: string;
  date: string; // You can use Date if needed to manipulate it in JavaScript
  reviewerName: string;
  reviewerEmail: string;
}

interface ProductMeta {
  createdAt: string; // You can use Date if needed
  updatedAt: string; // You can use Date if needed
  barcode: string;
  qrCode: string;
}

export interface Product {
  _id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: ProductDimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: ProductReview[];
  returnPolicy: string;
  quantity: number;
  minimumOrderQuantity: number;
  meta: ProductMeta;
  thumbnail: string;
  images: string[];
}
