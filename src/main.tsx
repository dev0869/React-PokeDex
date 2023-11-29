import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {BrowserRouter as Router} from 'react-router-dom'
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools/>
      <Router>
      <App />
      </Router>
    </QueryClientProvider>
  </>
);
