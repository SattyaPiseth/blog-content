// NavbarComponent.js
import { Button, Navbar, NavbarBrand } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"; // Importing the search icon

export function NavbarComponent() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar fluid rounded className="bg-blue-200">
        <NavbarBrand href="/">
          <img
            src="src/assets/—Pngtree—circle clipart black circle_5553148.png"
            className="mr-3 h-6 sm:h-9"
            alt="LOGO"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            LOGO
          </span>
        </NavbarBrand>
        <div className="flex md:order-2">
          <Button className="bg-black text-white" onClick={() => navigate('/login')}>
            Login
          </Button>
          <div className="mx-5">
            <Button className="bg-black text-white" onClick={() => navigate('/register')}>
              Sign Up
            </Button>
          </div>
        </div>
      </Navbar>
    </div>
  );
}
