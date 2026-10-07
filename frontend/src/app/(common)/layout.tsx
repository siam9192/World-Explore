import Container from "@/components/layout/Container";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import React from "react";
interface Props {
  children: React.ReactNode;
}
function layout({ children }: Props) {
  return (
    <div>
      <Header />
    { children}
      <Footer/>
    </div>
  );
}

export default layout;
