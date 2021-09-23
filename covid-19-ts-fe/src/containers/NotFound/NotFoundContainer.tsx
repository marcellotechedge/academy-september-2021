import React from 'react';
import { Link } from 'react-router-dom';

import "./NotFoundContainer.scss";

export const NotFoundContainer: React.FC = () => (
    <div className="NotFoundContainer-wrapper">
        <h1>Ops, page not found!</h1>
        <h2>Come back <Link to="/">to Home</Link></h2>
    </div>
)

export default NotFoundContainer