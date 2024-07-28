import React, { useState } from "react";
import { data } from "@/app/data";

export const ProductList = ({
  allProducts,
  setAllProducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const onAddProduct = product => {
    if (allProducts.find(item => item.id === product.id)) {
      const products = allProducts.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setTotal(total + product.price * product.quantity);
      setCountProducts(countProducts + product.quantity);
      return setAllProducts([...products]);
    }
    setTotal(total + product.price * product.quantity);
    setCountProducts(countProducts + product.quantity);
    setAllProducts([...allProducts, product]);
  };

  const onProductClick = product => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div>
      <div className='container-items'>
        {data.map(product => (
          <div className='item' key={product.id}>
            <figure onClick={() => onProductClick(product)}>
              <img src={product.urlImage} alt={product.title} />
            </figure>
            <div className='info-product'>
              <h2>{product.nameProduct}</h2>
              <p className='price'>${product.price}</p>
              <button onClick={() => onAddProduct(product)}>
                Añadir al carrito
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedProduct && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={closeModal}>&times;</span>
            <h2>{selectedProduct.nameProduct}</h2>
            <img src={selectedProduct.urlImage} alt={selectedProduct.title} />
            <p>{selectedProduct.description}</p>
            <p className='price'>${selectedProduct.price}</p>
            <button onClick={() => {
              onAddProduct(selectedProduct);
              closeModal();
            }}>Añadir al carrito</button>
          </div>
        </div>
      )}
    </div>
  );
};
