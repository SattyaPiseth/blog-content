import { Outlet } from "react-router-dom";
import { NavbarComponent } from "./NavbarComponent";
import { FooterComponent } from "./FooterComponent";


export default function RootLayout() {
  return (
    <>
      <header>
        <NavbarComponent></NavbarComponent>
      </header>
      <Outlet/>
      <FooterComponent/>
    </>
  );
}
