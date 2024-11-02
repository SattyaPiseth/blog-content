import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";


export function NavbarComponent() {
  return (
    <div >
<Navbar fluid rounded className="bg-blue-200">
      <NavbarBrand href="https://flowbite-react.com">
        <img
          src="src/assets/—Pngtree—circle clipart black circle_5553148.png"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          LOGO
        </span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Button>Login</Button>
        <div className="mx-5">
        <Button>Sign Up</Button>
        </div>
      </div>
    </Navbar>
    </div>
    
  );
}
