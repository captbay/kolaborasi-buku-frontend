import React from "react";

export default function Page() {
  const purchasedBooks = [
    { title: "Book 1", price: 10, image: "book1.jpg" },
    { title: "Book 2", price: 15, image: "book2.jpg" },
    { title: "Book 3", price: 20, image: "book3.jpg" },
  ];

  const total = purchasedBooks.reduce((acc, book) => acc + book.price, 0);

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Ringkasan Pembelian
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {purchasedBooks.map((book, index) => (
          <div
            key={index}
            className="bg-white rounded-lg overflow-hidden shadow-md"
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-56 object-cover object-center"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
              <p className="text-gray-700 mb-4">Harga: ${book.price}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <hr className="my-4 border-t border-gray-300" />
        <div className="flex justify-between">
          <span className="text-xl font-semibold">Total Harga:</span>
          <span className="text-xl font-semibold">${total}</span>
        </div>
      </div>
    </div>
  );
}
