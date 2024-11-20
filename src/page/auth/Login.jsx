import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/features/user/userSlice.js";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("newuser3");
  const [password, setPassword] = useState("NewUser3@2023");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.user);

  const saveAuthToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(loginUser({ username, password }));
  
    if (loginUser.fulfilled.match(resultAction)) {
      // Log the token after login
      const token = localStorage.getItem('authToken');
      console.log('Token after login:', token);  // Log to verify token is stored correctly
  
      // Navigate to the desired page on successful login
      navigate("/cardaccount"); // Adjust route as needed
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen">
      <Card className="max-w-lg w-full">
        <h1 className="text-center text-2xl font-bold">Login</h1>
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
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
          <div className="flex items-center gap-2">
            <Checkbox
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <Label htmlFor="showPassword">Show Password</Label>
          </div>
          <Button type="submit" className="bg-blue-800" disabled={status === "loading"}>
            {status === "loading" ? "Logging in..." : "Submit"}
          </Button>
          {error && <p className="text-red-500">{error}</p>}
          <Button color="gray" onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </form>
      </Card>
    </main>
  );
}
