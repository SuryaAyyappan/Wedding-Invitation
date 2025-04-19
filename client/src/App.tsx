import { Route, Switch, Router } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import "@/styles/theme.css";
import "@/styles/global.css";

// Get the base path from the environment or default to /Wedding-Invitation
const base = '/Wedding-Invitation';

function App() {
  return (
    <Router base={base}>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
      <Toaster />
    </Router>
  );
}

export default App;
