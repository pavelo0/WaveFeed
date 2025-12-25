import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import * as React from 'react'

export const Route = createRootRoute({
	component: RootComponent
})

function RootComponent() {
	return (
		<React.Fragment>
			<nav>
				<ul className={bg-blue-500}>
					<Link to="/">Feed</Link>
					<Link to="/about">About</Link>
					<Link to="/about">Contacts</Link>
				</ul>
			</nav>

			<Outlet />

			<p>Copyright</p>
		</React.Fragment>
	)
}
 