import { BrowserRouter} from "react-router-dom";
import App from "../App";

export default function Router() {
  // const showNavBar = !['/sign-in','/sign-up'].includes(location.pathname)
  return (
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  );
}
