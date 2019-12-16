import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routePaths from '../shared/routePaths';
import Testimonials from './testimonials/Testimonials';
import Dashboard from './dashboard/Dashboard';
import Property from './property/Property';
import Owner from './owner/Owner';

const ContentRoute = () => {
	return(
		<Switch>
			<Route exact path={routePaths.ROOT} component={Dashboard} />
			<Route path={routePaths.PROPERTY} component={Property} />
			<Route path={routePaths.OWNER} component={Owner} />
			<Route path={routePaths.TESTIMONIALS} component={Testimonials} />

		</Switch>
	)
}

export default ContentRoute;