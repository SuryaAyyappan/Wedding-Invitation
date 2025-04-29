import { Route, Switch, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import "@/styles/theme.css";
import "@/styles/global.css";

function App() {
  const [location] = useLocation();
  
  return (
    <>
      <Switch>
        <Route path="/Wedding-Invitation/" component={Home} />
        <Route path="/Wedding-Invitation" component={Home} />
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
      <Toaster />
    </>
  );
}

export default App;
