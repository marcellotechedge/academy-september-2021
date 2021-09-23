import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

import './LoadingOverlay.scss';

export type LoadingOverlayProps = {
    active?: boolean
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ active, children }) => (
    <>
        {active && 
            <div className="loading-overlay">
                <ProgressSpinner />
            </div>
        }
        <div className={active ? "loading-overlay-wrapper" : ""}>
            {children}
        </div>
    </>
)