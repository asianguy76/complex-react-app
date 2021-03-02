import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Axios from 'axios';
// Next line sets default URL from backend
Axios.defaults.baseURL = 'http://localhost:8080';

// Components

import Header from './components/Header';
import HomeGuest from './components/HomeGuest';
import Footer from './components/Footer';
import About from './components/About';
import Terms from './components/Terms';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
import ViewSingePost from './components/ViewSinglePost';

function Main() {
	const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem('complexappToken')));

	return (
		<BrowserRouter>
			<Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />

			<Switch>
				<Route path="/" exact>
					{loggedIn ? <Home /> : <HomeGuest />}
				</Route>
				<Route path="/post/:id">
					<ViewSingePost />
				</Route>
				<Route path="/create-post">
					<CreatePost />
				</Route>
				<Route path="/about" exact>
					<About />
				</Route>
				<Route path="/terms" exact>
					<Terms />
				</Route>
			</Switch>

			<Footer />
		</BrowserRouter>
	);
}

ReactDOM.render(<Main />, document.querySelector('#app'));

if (module.hot) {
	module.hot.accept();
}
