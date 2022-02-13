import {
    Routes,
    Route,
    Link
  } from "react-router-dom";
import UserProfile from "./UserProfile";
import OwnUserProfile from "./OwnUserProfile";
import { Box } from "@mui/system";
  
  
  export default function Users() {
    return (
      <div>
          <Box sx={{height:"300px", width:"700px", backgroundColor:"blueviolet"}} ></Box>
        <nav>
          <Link to="me">My Profile</Link>
        </nav>
  
        <Routes>
          <Route path=":id" element={<UserProfile />} />
          <Route path="me" element={<OwnUserProfile />} />
        </Routes>
      </div>
    );
  }