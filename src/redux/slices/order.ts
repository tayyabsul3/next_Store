import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state shape explicitly with proper types.
interface orderState {
  orders: any[];
}

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [
      
      {
        orderId: 0.9987765824188093,
        customerId: 0.32451949795656865,
        customer: {
          firstName: "Muhammad",
          lastName: "Tayyab",
          email: "tayyabsultan621@gmail.com",
          phoneNumber: "03145116290",
        },
        shippingAddress: {
          streetAddress:
            "House no 48 street no 6 lane no 3 quaid-e-azam colony Dhamial camp Chakri road Rawalpindi",
          city: "Rawalpindi",
          state: "",
          zipCode: "RAWALPINDI",
          country: "Pakistan",
        },
        items: [
          {
            id: 3,
            title: "Powder Canister",
            description:
              "The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.",
            category: "beauty",
            price: 14.99,
            discountPercentage: 18.14,
            rating: 3.82,
            stock: 59,
            tags: ["beauty", "face powder"],
            brand: "Velvet Touch",
            sku: "9EN8WLT2",
            weight: 8,
            dimensions: {
              width: 24.16,
              height: 10.7,
              depth: 11.07,
            },
            warrantyInformation: "2 year warranty",
            shippingInformation: "Ships in 1-2 business days",
            availabilityStatus: "In Stock",
            reviews: [
              {
                rating: 5,
                comment: "Very happy with my purchase!",
                date: "2024-05-23T08:56:21.618Z",
                reviewerName: "Ethan Thompson",
                reviewerEmail: "ethan.thompson@x.dummyjson.com",
              },
              {
                rating: 4,
                comment: "Great value for money!",
                date: "2024-05-23T08:56:21.618Z",
                reviewerName: "Levi Hicks",
                reviewerEmail: "levi.hicks@x.dummyjson.com",
              },
              {
                rating: 5,
                comment: "Highly impressed!",
                date: "2024-05-23T08:56:21.618Z",
                reviewerName: "Hazel Gardner",
                reviewerEmail: "hazel.gardner@x.dummyjson.com",
              },
            ],
            returnPolicy: "60 days return policy",
            minimumOrderQuantity: 25,
            meta: {
              createdAt: "2024-05-23T08:56:21.618Z",
              updatedAt: "2024-05-23T08:56:21.618Z",
              barcode: "0516267971277",
              qrCode: "https://assets.dummyjson.com/public/qr-code.png",
            },
            images: [
              "https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/1.png",
            ],
            thumbnail:
              "https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png",
            quantity: 4,
          },
        ],
        paymentDetails: {
          cardNumber: "",
          expirationDate: "",
          cvc: "",
        },
        orderSummary: {
          subTotal: 90,
          taxes: 8,
          shippingTotal: 5,
          totalAmount: 103,
        },
        orderStatus: "Shipped",
        paymentStatus: "Successful",
        shipmentStatus: "In Transit",
        orderDate: 1734192100600,
        shippingDate: "2024-12-11T09:00:00Z",
        deliveryDate: "2024-12-14T16:00:00Z",
        promoCode: "",
      },
    ],
  } as orderState,
  reducers: {
    createOrder: (state, action) => {
      const { data } = action.payload;
      const newOrders = [...state.orders, data];
      state.orders = newOrders;
    },
  },
});

export const { createOrder } = orderSlice.actions;

export default orderSlice.reducer;
