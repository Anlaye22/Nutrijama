import { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);
const getLocalOrders = () => {
  try {
    const ordersData = localStorage.getItem("userOrdersHistory");
    return ordersData ? JSON.parse(ordersData) : {};
  } catch (error) {
    console.error("Error al cargar el historial de pedidos:", error);
    return {};
  }
};
const saveLocalOrders = (orders) => {
  try {
    localStorage.setItem("userOrdersHistory", JSON.stringify(orders));
  } catch (error) {
    console.error("Error al guardar el historial de pedidos:", error);
  }
};

const getLocalFeedbackStatus = () => {
  try {
    const feedbackData = localStorage.getItem("userFeedbackStatus");
    // Devuelve un objeto donde la clave es el ID del pedido y el valor es 'sent'
    return feedbackData ? JSON.parse(feedbackData) : {};
  } catch (error) {
    console.error("Error al cargar el estado del feedback:", error);
    return {};
  }
};

const saveLocalFeedbackStatus = (feedbackStatus) => {
  try {
    localStorage.setItem("userFeedbackStatus", JSON.stringify(feedbackStatus));
  } catch (error) {
    console.error("Error al guardar el estado del feedback:", error);
  }
};

export const CartProvider = ({ children, currentUserEmail }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const updateQty = (id, amount) => {
    setCart((prev) =>
      prev
        .map((p) =>
          p.id === id ? { ...p, qty: Math.max(1, p.qty + amount) } : p
        )
        .filter((p) => p.qty > 0)
    );
  };

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [cart]);

  const getDiscountRate = (couponCode) => {
    // Lógica de cupones (Debería ser más robusta, ej. verificar si ya usó PRIMERA50)
    switch (couponCode) {
      case "PRIMERA50":
        return 0.5; // 50%
      case "DIAB20":
        return 0.2; // 20%
      case "HIPER15":
        return 0.15; // 15%
      case "FIEL10":
        // Aquí podrías volver a verificar la condición de fidelidad
        // if (checkLoyaltyCondition()) return 0.10;
        return 0.1; // 10%
      default:
        return 0.0;
    }
  };

  // Función para intentar aplicar un cupón
  const applyCoupon = (code) => {
    const rate = getDiscountRate(code);
    if (rate > 0) {
      setAppliedCoupon({ code, rate });
      return true;
    } else {
      setAppliedCoupon(null);
      return false;
    }
  };

  // NUEVO CÁLCULO DEL TOTAL FINAL
  const finalTotal = useMemo(() => {
    if (!appliedCoupon) return subtotal;

    const discountAmount = subtotal * appliedCoupon.rate;
    return subtotal - discountAmount;
  }, [subtotal, appliedCoupon]);

  const placeOrder = () => {
    if (!currentUserEmail || cart.length === 0) {
      console.error("No hay usuario o el carrito está vacío.");
      return;
    }

    const totalAtPayment = finalTotal;

    const newOrder = {
      id: `pedido-${Date.now()}`,
      fecha: new Date().toISOString(),
      valorTotal: totalAtPayment,
      items: cart, // Guarda la lista actual del carrito
    };

    const allOrders = getLocalOrders();

    if (!allOrders[currentUserEmail]) {
      allOrders[currentUserEmail] = [];
    }

    allOrders[currentUserEmail].unshift(newOrder);
    saveLocalOrders(allOrders);
    setCart([]);
    setAppliedCoupon(null);

    return newOrder;
  };

  const getOrdersHistory = () => {
    if (!currentUserEmail) return [];

    const allOrders = getLocalOrders();
    // Devuelve el array de pedidos para el usuario actual, o un array vacío si no hay.
    return allOrders[currentUserEmail] || [];
  };

  const markFeedbackSent = (orderId) => {
    const currentStatus = getLocalFeedbackStatus();
    currentStatus[orderId] = "sent";
    saveLocalFeedbackStatus(currentStatus);
  };

  // Función para obtener el estado de la retroalimentación para un pedido
  const getFeedbackStatus = (orderId) => {
    const currentStatus = getLocalFeedbackStatus();
    return currentStatus[orderId] === "sent"; // Devuelve true si fue enviado
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        subtotal,
        finalTotal,
        applyCoupon,
        appliedCoupon,
        placeOrder,
        getOrdersHistory,
        markFeedbackSent,
        getFeedbackStatus,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
