import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../routes';

export default function Navbar() {
    return (
        <div>
             <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded mb-2">
        <div className="container">
          {routes
            .filter((item) => item.isNav === true)
            .map((item) => (
              <Link className="navbar-brand" to={item.path}>
                {item.title}
              </Link>
            ))}
        </div>
      </nav>
        </div>
    )
}
