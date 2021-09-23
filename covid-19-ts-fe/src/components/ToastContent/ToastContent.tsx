import React from 'react'

export type ToastContentProps = {
    message: string,
    action?: React.ReactNode,
    title?: string
}

export const ToastContent: React.FC<ToastContentProps> = ({ title, action, message }) => (
    <div className="p-flex p-flex-column" style={{flex: '1'}}>
        <div className="p-text-center">
            {title && <h3>{title}</h3>}
            <p>{message}</p>
        </div>
        {action && (
            <div className="p-grid p-fluid">
                <div className="p-col-12">
                    {action}
                </div>
            </div>
        )}
    </div>
)