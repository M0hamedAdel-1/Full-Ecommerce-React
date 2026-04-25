import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/context/Auth.jsx";
import CartProvider from "./components/context/CartContext.jsx";
import ThemeProvider from "./components/context/ThemeContext.jsx";
import Aos from "aos";
import { GoogleOAuthProvider } from "@react-oauth/google";

Aos.init({
  duration: 1000,
  easing: "ease-in-out",
  // once: true,
});

createRoot(document.getElementById("root")).render(
    <StrictMode>
  {/* <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}> */}

  <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
  </BrowserRouter>
  {/* </GoogleOAuthProvider> */}
    </StrictMode>
);
