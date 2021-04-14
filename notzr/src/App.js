
import './App.css';
import * as React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import View from './pages/view.js';
import Catalogue from './pages/catalogue.js';
import Upload from './pages/file-upload/upload.js';
import Dash from './pages/dashboard/dash.js'
import Homepage from './pages/homepage.js';
import Infopage from './pages/infopage.js';
import{BrowserRouter as Router, Switch, Route} from "react-router-dom";


function App() {
  
  return (
  <ChakraProvider>
    <div className="App">
      <Router>

        <Switch>
        <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/view">
            <View/>
          </Route>
          <Route path="/catalogue">
            <Catalogue/>
          </Route>
          <Route path="/upload">
            <Upload/>
          </Route>
          <Route path="/dash">
            <Dash/>
          </Route>
          <Route path="/Infopage">
            <Infopage />
          </Route>
        </Switch>
      </Router>
    </div>
  </ChakraProvider>
  );
}
export default App;
