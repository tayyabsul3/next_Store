"use client";
import Cart from "@/components/Cart/Cart";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createOrder } from "@/redux/slices/order";
import { updateQuantity, updateProductData } from "@/redux/slices/product";
import { Product } from "@/types/product";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiCheck } from "react-icons/bi";
import axios from "axios";
import { toast } from "sonner";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/Cart/CheckoutForm";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("Please provide a public key");
}

const stripPromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const page = () => {
  const dispatch = useAppDispatch();
  const [activeOption, setactiveOption] = useState<number>(0);
  const [completed, setcompleted] = useState<number[]>([]);
  const { cart } = useAppSelector((state) => state.product);
  const [cartItems, setcartItems] = useState(cart);
  useEffect(() => {
    setcartItems(cart);
  }, [cart]);
  const [selectedOption, setSelectedOption] = useState("");

  const shippingOptions = [
    { id: "freeShipping", label: "Free Shipping", price: 0 },
    { id: "expressShipping", label: "Express Shipping", price: 19 },
  ];
  const steps = [
    { label: "Shopping cart", status: 1 },
    { label: "Checkout details", status: 2 },
    { label: "Complete order", status: 3 },
  ];
  const handleRadioChange = (option: string) => {
    setSelectedOption(option);
  };

  const CalculateTotalPrice = () => {
    const shippingPrice =
      shippingOptions.find((option) => option.id === selectedOption)?.price ||
      0;
    const cartTotal = cart.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );
    return (cartTotal + shippingPrice).toFixed(2);
  };
  // const CalculateSubTotalPrice = () => {
  //   const cartTotal = cart.reduce(
  //     (acc, curr) => acc + curr.price * curr.quantity,
  //     0
  //   );
  //   return cartTotal.toFixed(2);
  // };
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    streetAddress: "",
    country: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expirationDate: "",
    cvc: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const newOrder = async (data: any) => {
  //   fetch("http://localhost:4000/orders/new", {
  //     method: "POST",
  //     credentials: 'same-origin',
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ ...data }),
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {

  //       const { order, success } = res;
  //       if (success) {
  //         dispatch(
  //           createOrder({
  //             data: order,
  //           })
  //         );
  //         alert("order sucess" + res);
  //       } else {
  //         console.log(res);
  //       }
  //     })
  //     // .then(() => {

  //       setFormData({
  //         firstName: "",
  //         lastName: "",
  //         phoneNumber: "",
  //         email: "",
  //         streetAddress: "",
  //         country: "",
  //         city: "",
  //         state: "",
  //         zipCode: "",
  //         cardNumber: "",
  //         expirationDate: "",
  //         cvc: "",
  //       });
  //       setactiveOption(2);
  //       setcompleted([0, 1]);
  //       dispatch(
  //         updateProductData({
  //           cart: [],
  //         })
  //       );
  //     })
  //     .catch((e) => console.log(e));
  // };

  const newOrder = async (data: any) => {
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:4000/orders/new",
        data,
        {
          withCredentials: true, // This ensures credentials (like cookies) are included in cross-origin requests
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(
        createOrder({
          data: response.data.order,
        })
      );

      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        streetAddress: "",
        country: "",
        city: "",
        state: "",
        zipCode: "",
        cardNumber: "",
        expirationDate: "",
        cvc: "",
      });
      setactiveOption(2);
      setcompleted([0, 1]);
      dispatch(
        updateProductData({
          cart: [],
        })
      );
      toast.success("order has been created");
      console.log(response.data);
    } catch (e) {
      console.error("Error:", e);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { phoneNumber, streetAddress, country, city, state } = formData;
    if (!streetAddress || !city || !state || !country || !phoneNumber) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const shippingPrice =
      shippingOptions.find((option) => option.id === selectedOption)?.price ||
      0;

    let items: any[] = [];

    cart.forEach((item) => {
      items.push({
        product: item._id,
        quantity: item.quantity,
      });
    });
    const data = {
      subtotal: CalculateSubTotalPrice(),
      shipping: shippingPrice,
      tax: 5.0,
      totalPrice: CalculateTotalPrice(),
      shippingInfo: {
        address: streetAddress,
        city,
        state,
        country,
        phoneNo: phoneNumber,
      },
      orderItems: items,
    };
    dispatch(
      createOrder({
        data: data,
      })
    );
    localStorage.setItem("order", JSON.stringify(data));
    setcompleted([0, 1]);
    console.log(data);
    setactiveOption(2);
  };

  function convertSubcurrency(amount: number) {
    return Math.round(amount * 100);
  }
  const CalculateSubTotalPrice = () => {
    const cartTotal = cart.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );
    return cartTotal.toFixed(2);
  };

  return (
    <div>
      <div className="mx-auto max-w-7xl mt-20 max-2xl:px-5">
        <h1 className="my-40 mb-20 text-center text-5xl font-medium">Cart</h1>
        <div className="buttons max-lg:hidden flex justify-around my-10 ">
          {steps.map((step, i) => (
            <div
              key={i}
              className={
                activeOption === i
                  ? "flex gap-5 items-center border-b-2 border-black p-5"
                  : completed.includes(i)
                  ? "flex gap-5 items-center p-5 text-green-400"
                  : "flex gap-5 items-center p-5"
              }
            >
              <span
                className={
                  activeOption === i
                    ? "w-16 h-16 text-xl flex justify-center items-center bg-black text-white rounded-full"
                    : completed.includes(i)
                    ? "w-16 h-16 text-xl flex justify-center items-center bg-green-100 text-green-400 rounded-full"
                    : "w-16 h-16 text-xl flex justify-center items-center bg-gray-100 text-gray-400 rounded-full"
                }
              >
                {completed.includes(i) ? <BiCheck /> : step.status}
              </span>
              <span className={activeOption ? "" : "text-gray-500"}>
                {step.label}{" "}
              </span>
            </div>
          ))}
        </div>

        {activeOption === 0 ? (
          <div className="flex gap-10 flex-wrap">
            <div className="table flex-1">
              <div
                className="headder flex w-full p-2
             justify-between  py-5 border-black border-b "
              >
                <h1 className="font-semibold text-lg md:w-60">Product</h1>
                <h1 className="font-semibold text-lg w-auto">Quantity</h1>
                <h1 className=" max-md:hidden font-semibold text-lg w-auto">
                  Price
                </h1>
                <h1 className=" max-md:hidden font-semibold text-lg w-auto">
                  Total
                </h1>
              </div>
              <div className="rows mt-5 p-2 flex flex-col gap-5">
                {cartItems.map((product, i) => (
                  <div key={i}>
                    <Cart item={product} />
                  </div>
                ))}
              </div>
            </div>
            <div className="card xl:m-10 mb-10  border-2 flex flex-col shadow-sm xl:min-w-[500px] gap-5 rounded-lg  border-black  p-5  md:p-10 h-fit">
              <h1 className="font-semibold text-lg md:text-2xl">
                Cart summary
              </h1>
              <div className="options space-y-5">
                {shippingOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`option flex justify-between px-2 md:px-5 md:py-3 p-2 md:text-lg gap-5 border rounded-md ${
                      selectedOption === option.id ? "bg-gray-100" : "bg-white"
                    }`}
                  >
                    <div className="flex gap-5 items-center">
                      <input
                        type="radio"
                        name="option"
                        id={option.id}
                        className="accent-black scale-110 rounded-full"
                        checked={selectedOption === option.id}
                        onChange={() => handleRadioChange(option.id)}
                      />
                      <h2>{option.label}</h2>
                    </div>
                    <p>${option.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="amount space-y-2">
                <div className="subtotal flex justify-between  border-b pb-5">
                  <p>Subtotal</p>
                  <p>${CalculateSubTotalPrice()}</p>
                </div>
                <div className="total font-medium text-lg flex justify-between ">
                  <p>Total</p>
                  <p>${CalculateTotalPrice()}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  if (activeOption === 0) {
                    if (selectedOption === "") {
                      toast("Please select an option for shipping");
                      return;
                    }
                    setactiveOption(1);
                    setcompleted((prev) => {
                      return [...prev, 0];
                    });
                  }
                }}
                className="bg-black   text-white  p-3   opacity-100  transition-all duration-300 w-full  rounded-md hover:bg-black/90 px-5"
              >
                Checkout
              </button>
            </div>
          </div>
        ) : activeOption === 1 ? (
          <div className="flex gap-5 md:gap-10 max-md:flex-col-reverse mb-20">
            <div className="OrderDetails flex-1 w-full space-y-10">
              <div className="customerDetails flex flex-col gap-5 border-2 border-black max-md:text-sm rounded-md p-5  md:p-10">
                <h1 className="text-2xl font-medium">Shipping Address</h1>
                <div className="field flex flex-col gap-2  w-full">
                  <label
                    htmlFor="streetAddress"
                    className="font-semibold uppercase text-sm text-gray-500"
                  >
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="streetAddress"
                    placeholder="Street Address"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    className="border p-2 px-5 w-full outline-none border-gray-400 rounded-lg bg-transparent"
                  />
                </div>
                <div className="field flex flex-col gap-2  w-full">
                  <label
                    htmlFor="phoneNumber"
                    className="font-semibold uppercase text-sm text-gray-500"
                  >
                    Phone Number
                  </label>
                  <input
                    type="number"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="border p-2 px-5 w-full outline-none border-gray-400 rounded-lg bg-transparent"
                  />
                </div>
                <div className="field flex flex-col gap-2 w-full">
                  <label
                    htmlFor="country"
                    className="font-semibold uppercase text-sm text-gray-500"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="border p-2 px-5 w-full outline-none border-gray-400 rounded-lg bg-transparent"
                  />
                </div>
                <div className="field flex flex-col gap-2  w-full">
                  <label
                    htmlFor="city"
                    className="font-semibold uppercase text-sm text-gray-500"
                  >
                    Town / City
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Town / City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="border p-2 px-5 w-full outline-none border-gray-400 rounded-lg bg-transparent"
                  />
                </div>
                <div className="flex gap-5 w-full">
                  <div className="field flex flex-col gap-2  w-full">
                    <label
                      htmlFor="state"
                      className="font-semibold uppercase text-sm text-gray-500"
                    >
                      State/Province
                    </label>
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="border p-2 px-5 w-full outline-none border-gray-400 rounded-lg bg-transparent"
                    />
                  </div>
                  {/* <div className="field flex flex-col gap-2  w-full">
                    <label
                      htmlFor="zipCode"
                      className="font-semibold uppercase text-sm text-gray-500"
                    >
                      Zip Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="Zip Code"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="border p-2 px-5 w-full outline-none border-gray-400 rounded-lg bg-transparent"
                    />
                  </div> */}
                </div>
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-black text-white p-3 opacity-100 transition-all duration-300 w-full rounded-md hover:bg-black/90 px-5"
              >
                Place Order
              </button>
            </div>
            <div className="card   border-2 flex flex-col gap-5 shadow-sm lg:min-w-[500px] max-md:w-full  rounded-lg  border-black p-10 h-fit">
              <h1 className="font-semibold text-xl md:text-2xl">
                Order summary
              </h1>
              <div className="options space-y-5 mb-5">
                {cartItems.map((cartItem, i) => (
                  <div className="flex gap-2 pb-5 border-b" key={i}>
                    <img src={cartItem.thumbnail} alt="item" className="w-20" />
                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex justify-between font-bold w-full">
                        <h2 className=" ">{cartItem.title}</h2>
                        <p>
                          ${(cartItem.price * cartItem.quantity).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex justify-between  w-full">
                        <h2 className=" ">Color : Black</h2>
                        <p></p>
                      </div>
                      <div className="border mt-1 p-1 px-3 rounded-lg border-black flex gap-5 items-center w-fit ">
                        <button
                          onClick={() => {
                            dispatch(
                              updateQuantity({
                                id: cartItem._id,
                                type: "decrease",
                              })
                            );
                          }}
                        >
                          -
                        </button>
                        <p className="font-medium ">{cartItem.quantity}</p>
                        <button
                          onClick={() => {
                            dispatch(
                              updateQuantity({
                                id: cartItem._id,
                                type: "increase",
                              })
                            );
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  className=" border w-full  rounded-md p-2"
                  placeholder="Input"
                />
                <button className="bg-black   text-white  p-3   opacity-100  transition-all duration-300 w-fit  rounded-md hover:bg-black/90 px-5">
                  Apply
                </button>
              </div>
              <div className="amount space-y-3">
                <div className="subtotal flex justify-between  border-b pb-3">
                  <p>Shipping</p>
                  <p className="font-semibold">
                    {selectedOption === "freeShipping" ? "Free" : "Deluxe"}
                  </p>
                </div>
                <div className="subtotal flex justify-between  border-b pb-3">
                  <p>Subtotal</p>
                  <p className="font-semibold">${CalculateSubTotalPrice()}</p>
                </div>
                <div className="total font-medium text-lg flex justify-between ">
                  <p>Total</p>
                  <p>${CalculateTotalPrice()}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-20 shadow-2xl flex-col gap-2 flex justify-center items-center m-20 max-w-5xl mx-auto">
            <h1>Your have to pay ${CalculateTotalPrice()}</h1>
            <Elements
              stripe={stripPromise}
              options={{
                mode: "payment",
                amount: convertSubcurrency(CalculateTotalPrice()),
                currency: "usd",
              }}
            >
              <CheckoutForm amount={CalculateTotalPrice()} />
            </Elements>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
