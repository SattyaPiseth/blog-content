import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/features/user/userSlice.js"; // Import your thunk

export function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
 

  const handleRegister = async (e) => {
    e.preventDefault();

    
    if (password !== confirmPassword) {
      // Show an error message if passwords don't match
      alert("Passwords do not match!");
      return;
    }

    const resultAction = await dispatch(registerUser({ username, email, password }));

    if (registerUser.fulfilled.match(resultAction)) {
      // Navigate to the desired page on successful registration
      navigate("/login"); // Adjust route as needed (e.g., navigate to the login page)
    } else {
      alert(resultAction.payload || "Registration failed. Please try again.");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen">
      <Card className="max-w-lg w-full">
        <h1 className="text-center text-2xl font-bold">Register</h1>
        <form className="flex flex-col gap-4" onSubmit={handleRegister}>
          {/* Username Field */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="username" value="Your username" />
            </div>
            <TextInput
              id="username"
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Email Field */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <TextInput
              id="email"
              type="email"
              placeholder="Email@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Your password" />
            </div>
            <TextInput
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="confirmPassword" value="Confirm your password" />
            </div>
            <TextInput
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Show Password Checkbox */}
          <div className="flex items-center gap-2">
            <Checkbox
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <Label htmlFor="showPassword">Show Password</Label>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="bg-blue-800">
            Submit
          </Button>

          {/* Back to Home Button */}
          <Button color="gray" onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </form>
      </Card>
    </main>
  );
}
