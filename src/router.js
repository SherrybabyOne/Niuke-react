import React,{Component} from 'react';
import { BrowserRouter,Route,Switch } from 'react-router-dom';
import App from './App';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import Bossinfo from './pages/bossinfo';
import Geniusinfo from './pages/geniusinfo';
import Dashboard from './pages/dashboard';

class Router extends Component{

    render(){
        return(
            <BrowserRouter>
                <App>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/register' component={Register} />
                        <Route exact path='/bossinfo' component={Bossinfo} />
                        <Route exact path='/geniusinfo' component={Geniusinfo} />
                        <Route component={Dashboard} />
                    </Switch>
                </App>
            </BrowserRouter>
        )
    }
}

export default Router;