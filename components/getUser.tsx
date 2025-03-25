import  {jwtDecode, JwtPayload } from "jwt-decode";

// Custom JWT Payload Type
interface CustomJwtPayload extends JwtPayload {
  userId: number;
  name: string;
  role: string;
}

// Decode the JWT
const token = localStorage.getItem("token");
if (token) {
  const decodedToken = jwtDecode<CustomJwtPayload>(token);
  console.log("User ID:", decodedToken.id);
  console.log("Name:", decodedToken.email);
  
}

export default token;