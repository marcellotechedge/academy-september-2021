import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';
import { ToastContent } from '../../components/ToastContent/ToastContent';
import { APIStatus } from '../../store/axiosConfiguration';
import { AppHeader } from '../../components/AppHeader/AppHeader';
import { useAppDispatch, useAppSelector } from '../../store/storeConfiguration';
import { performLogin } from '../../store/actions/authActions';

export const BackOfficeContainer: React.FC = () => {
    const dispatch = useAppDispatch();
    const history = useHistory();
    const authState = useAppSelector(state => state.auth)
    const toast = useRef<Toast>(null);
    const [ username, setUsername ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");

    useEffect(() => {
        if ( toast.current === null ) {
            return;
        }

        if ( authState.status === APIStatus.READY ) {
            history.push('/back-office/home');
            return;
        }

        if ( authState.error && authState.status === APIStatus.IDLE ) {
            toast.current.show({
                severity: 'error',
                contentClassName: "backoffice-toast",
                content: (
                    <ToastContent message="Authorization failed." />
                ),
                life: 3000
            });
        }
    }, [ authState ]);

    return (
        <div>
            <AppHeader />
            <Toast ref={toast} />
            <div className="covid-app-form">
                <div className="covid-app-field">
                    <label htmlFor="covid-username">Username</label>
                    <div>
                        <InputText name="covid-username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                </div>

                <div className="covid-app-field">
                    <label htmlFor="covid-password">Password</label>
                    <div>
                        <Password name="covid-password" value={password} onChange={(e) => setPassword(e.target.value)} toggleMask />
                    </div>
                </div>

                <div className="covid-app-field">
                    <div>
                        <Button
                            label="Login"
                            onClick={() => dispatch(performLogin({ username, password }))}
                            disabled={username.length === 0 || password.length === 0}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BackOfficeContainer;