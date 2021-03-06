import React, {useState} from 'react';
import Header from "./ui/Header";
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import theme from './ui/Theme';
import Footer from "./ui/Footer";
import LandingPage from "./LandingPage";

function App() {

    const [value, setValue] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Header value={value} setValue={setValue} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>
                <Switch>
                    <Route exact path="/" render={(props) => <LandingPage {...props} setValue={setValue} setSelectedIndex={setSelectedIndex}/>} />
                    <Route exact path="/services" component={() => <div>services</div>}/>
                    <Route exact path="/customsoftware" component={() => <div>custom software</div>}/>
                    <Route exact path="/mobileapps" component={() => <div>mobile apps</div>}/>
                    <Route exact path="/websites" component={() => <div>websites</div>}/>
                    <Route exact path="/revolution" component={() => <div>revolution</div>}/>
                    <Route exact path="/about" component={() => <div>about us</div>}/>
                    <Route exact path="/contact" component={() => <div>contact us</div>}/>
                    <Route exact path="/estimate" component={() => <div>estimate</div>}/>
                </Switch>
                <Footer value={value} setValue={setValue} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>
            </BrowserRouter>

            {[...new Array(120)]
                .map(
                    () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                )
                .join('\n')}
        </ThemeProvider>
    );
}

export default App;
