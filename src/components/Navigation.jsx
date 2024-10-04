import { Tab, Tabs, Typography, Button, Box } from "@mui/material";
import { matchPath, useLocation, NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';

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

const Navigation = ({ onLogout }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userName = useSelector((state) => state.auth.user?.name);
  
  const routeMatch = useRouteMatch(
    isAuthenticated ? ['/contacts'] : ['/', '/login', '/register']
  );

  const currentTab = routeMatch?.pattern?.path || (isAuthenticated ? '/contacts' : '/');

  return (
    <Tabs value={currentTab} indicatorColor="primary" textColor="primary">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isAuthenticated ? (
            <Tab
              label="Contacts"
              value="/contacts"
              component={NavLink}
              to="/contacts"
              sx={{ textTransform: 'none' }}
              key="contacts"
            />
          ) : (
            <>
              <Tab
                label="Home"
                value="/"
                component={NavLink}
                to="/"
                sx={{ textTransform: 'none' }}
                key="home"
              />
              <Tab
                label="Register"
                value="/register"
                component={NavLink}
                to="/register"
                sx={{ textTransform: 'none' }}
                key="register"
              />
              <Tab
                label="Login"
                value="/login"
                component={NavLink}
                to="/login"
                sx={{ textTransform: 'none' }}
                key="login"
              />
            </>
          )}
        </Box>
        {isAuthenticated && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              component="span"
              variant="h6"
              sx={{ margin: "0 10px" }}
            >
              {userName}
            </Typography>
            <Button
              onClick={onLogout}
              sx={{
                textTransform: 'none',
                backgroundColor: 'transparent',
                border: '1px solid',
                borderColor: 'primary.main',
                padding: '8px 16px',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.08)',
                },
              }}
              key="logout"
            >
              Logout
            </Button>
          </Box>
        )}
      </Box>
    </Tabs>
  );
};

export default Navigation;
