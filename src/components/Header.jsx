"use client";
import { useState } from 'react';

export const Headers = ({
  allProducts,
  setAllProducts,
  total,
  countProducts,
  setCountProducts,
  setTotal,
}) => {
  const [active, setActive] = useState(false);

  const onDeleteProduct = product => {
    if (window.confirm(`¿Está seguro que desea eliminar ${product.title} del carrito?`)) {
      const results = allProducts.filter(
        item => item.id !== product.id
      );
      setTotal(total - product.price * product.quantity);
      setCountProducts(countProducts - product.quantity);
      setAllProducts(results);
    }
  };

  const onCleanCart = () => {
    if (window.confirm('¿Está seguro que desea vaciar el carrito?')) {
      setAllProducts([]);
      setTotal(0);
      setCountProducts(0);
    }
  };

  return (
    <header>
      <h1>Tienda de tecnología, software y hardware</h1>
      <div className='container-icon'>
        <div className='container-cart-icon' onClick={() => setActive(!active)}>
          <img
            src="https://t3.ftcdn.net/jpg/03/14/84/68/360_F_314846831_5jJsC7Us9obgwMjRDqFhs04dodzvnZvi.jpg"
            alt="carrito"
            className="icon-cart"
          />
          <div className='count-products'>
            <span id='contador-productos'>{countProducts}</span>
          </div>
        </div>
        <div className={`container-cart-products ${active ? '' : 'hidden-cart'}`}>
          {allProducts.length ? (
            <>
              <div className='row-product'>
                {allProducts.map(product => (
                  <div className='cart-product' key={product.id}>
                    <div className='info-cart-product'>
                      <img
                        src={product.urlImage}
                        alt={product.title}
                        className="cart-product-image"
                      />
                      <div className='cart-product-details'>
                        <span className='cantidad-producto-carrito'>
                          {product.quantity}
                        </span>
                        <p className='titulo-producto-carrito'>
                          {product.title}
                        </p>
                        <span className='precio-producto-carrito'>
                          ${product.price}
                        </span>
                      </div>
                    </div>
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/018/887/462/original/signs-close-icon-png.png"
                      alt="cerrar"
                      className="icon-close"
                      onClick={() => onDeleteProduct(product)}
                    />
                  </div>
                ))}
              </div>
              <div className='cart-total'>
                <h3>Total:</h3>
                <span className='total-pagar'>${total}</span>
              </div>
              <button className='btn-clear-all' onClick={onCleanCart}>
                Vaciar Carrito
              </button>
            </>
          ) : (
            <p className='cart-empty'>El carrito está vacío</p>
          )}
        </div>
      </div>
    </header>
  );
};
