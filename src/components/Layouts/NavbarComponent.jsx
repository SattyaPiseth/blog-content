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
            src="data:image/png;base64,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"
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
