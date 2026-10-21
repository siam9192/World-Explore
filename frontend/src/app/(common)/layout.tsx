import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { FavoritesProvider } from "@/context/FavoritesContext";
import React from "react";
interface Props {
  children: React.ReactNode;
}
function layout({ children }: Props) {
  return (
    <FavoritesProvider>
      <div>
        <Header />
        {children}
        <Footer />
      </div>
    </FavoritesProvider>
  );
}

export default layout;
