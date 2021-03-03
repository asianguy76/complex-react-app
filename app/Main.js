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
import FlashMessages from './components/FlashMessages';
import ExampleContext from './ExampleContext';

function Main() {
	const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem('complexappToken')));
	const [flashMessages, setFlashMessages] = useState([]);

	function addFlashMessage(msg) {
		setFlashMessages(prev => prev.concat(msg));
	}

	return (
		<ExampleContext.Provider value={{ addFlashMessage, setLoggedIn }}>
			<BrowserRouter>
				<FlashMessages messages={flashMessages} />
				<Header loggedIn={loggedIn} />

				<Switch>
					<Route path="/" exact>
						{loggedIn ? <Home /> : <HomeGuest />}
					</Route>
					<Route path="/post/:id">
						<ViewSingePost />
					</Route>
					<Route path="/create-post">
						<CreatePost addFlashMessage={addFlashMessage} />
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
		</ExampleContext.Provider>
	);
}

ReactDOM.render(<Main />, document.querySelector('#app'));

if (module.hot) {
	module.hot.accept();
}
