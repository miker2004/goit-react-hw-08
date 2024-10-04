import { Tab, Tabs } from "@mui/material";
import { matchPath, useLocation, NavLink } from "react-router-dom";

function useRouteMatch(patterns) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }
  return null;
}

const Navigation = ({ isAuthenticated, userName, onLogout }) => {
  const routeMatch = useRouteMatch(isAuthenticated ? ['/contacts', '/'] : ['/login', '/register']);
  const currentTab = routeMatch?.pattern?.path || "/"; 

  return (
    <Tabs value={currentTab} indicatorColor="primary" textColor="primary">
      <Tab
        label="Home"
        value="/"
        component={NavLink}
        to="/"
        sx={{ textTransform: 'none' }}  
      />
      {isAuthenticated ? (
        [
          <Tab
            label="Contacts"
            value="/contacts"
            component={NavLink}
            to="/contacts"
            sx={{ textTransform: 'none' }}
            key="contacts"
          />,
          <span key="username">{userName}</span>, 
          <Tab
            label="Logout"
            onClick={onLogout} 
            sx={{ textTransform: 'none' }}
            key="logout" 
          />
        ]
      ) : (
        [
          <Tab
            label="Register"
            value="/register"
            component={NavLink}
            to="/register"
            sx={{ textTransform: 'none' }}
            key="register" 
          />,
          <Tab
            label="Login"
            value="/login"
            component={NavLink}
            to="/login"
            sx={{ textTransform: 'none' }}
            key="login" 
          />
        ]
      )}
    </Tabs>
  );
};

export default Navigation;
