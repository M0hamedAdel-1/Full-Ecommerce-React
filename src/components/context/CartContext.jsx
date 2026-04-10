import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LuCable } from "react-icons/lu";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartitems, setCartitems] = useState(() => {
    const savedcart = localStorage.getItem("productsincart");
    return savedcart ? JSON.parse(savedcart) : [];
  });

  const [favorites, setfavorites] = useState(() => {
    const savedfav = localStorage.getItem("favoritesproducts");
    return savedfav ? JSON.parse(savedfav) : [];
  });

  const addToCart = (item) => {
    setCartitems((prevItems) => {
      const exists = prevItems.find((i) => i.id === item.id);
      if (!exists) return [...prevItems, { ...item, quantity: 1 }];
      return [...prevItems, { ...item, quantity: item.quantity + 1 }];
    });
    toast(`${item.name} added to cart \n you can see cart in navbar`, {
      duration: 6000,
      toasterId: "bottom-right",
      style: {
        background: "#22c55e",
        color: "#fff",
        fontWeight: "500",
        borderRadius: "8px",
      },
    });
  };

  // add to favorites
  const handleTogglefavorite = (item) => {
    const exists = favorites.find((i) => i.id === item.id);

    if (exists) {
      setfavorites((prev) => prev.filter((i) => i.id !== item.id));
      toast(`product removed to favorites `, {
        duration: 6000,
        toasterId: "bottom-right",
        style: {
          background: "#ef4444",
          color: "#fff",
          borderRadius: "8px",
          fontSize: "15px",
        },
      });
    } else {
      setfavorites((prev) => [...prev, { ...item, favorite: true }]);
      toast(`${item.name} added to favorites \n you can see cart in navbar`, {
        duration: 6000,
        toasterId: "bottom-right",
        style: {
          background: "#22c55e",
          color: "#fff",
          borderRadius: "8px",
          fontSize: "15px",
        },
      });
    }
  };

  useEffect(() => {
    localStorage.setItem("productsincart", JSON.stringify(cartitems));
  }, [cartitems]);

  useEffect(() => {
    localStorage.setItem("favoritesproducts", JSON.stringify(favorites));
  }, [favorites]);

  // function increase quantity
  const handleincreasebutton = (item) => {
    setCartitems((prev) =>
      prev.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
      ),
    );
  };
  // function decrease quantity
  const handledecreasebutton = (item) => {
    setCartitems((prev) =>
      prev.map((i) =>
        i.id === item.id
          ? { ...i, quantity: i.quantity > 1 ? i.quantity - 1 : i.quantity }
          : i,
      ),
    );
  };
  const removefromcart = (id) => {
    const removeformcart = cartitems.filter((item) => item.id !== id);
    setCartitems(removeformcart);
    toast(`product removed to cart `, {
      duration: 6000,
      toasterId: "bottom-right",
      style: {
        background: "#ef4444",
        color: "#fff",
        borderRadius: "8px",
        fontSize: "15px",
      },
    });
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        removefromcart,
        cartitems,
        setCartitems,
        handleincreasebutton,
        handledecreasebutton,
        handleTogglefavorite,
        favorites,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
