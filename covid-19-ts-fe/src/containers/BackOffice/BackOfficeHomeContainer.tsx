import React, { useEffect, useRef } from 'react';
import { Divider } from 'primereact/divider';
import { AppHeader } from '../../components/AppHeader/AppHeader';
import { InsertCasesForm } from '../../components/InsertCasesForm/InsertCasesForm';
import { useAppDispatch, useAppSelector } from '../../store/storeConfiguration';
import { Toast } from 'primereact/toast';
import { APIStatus } from '../../store/axiosConfiguration';
import { ToastContent } from '../../components/ToastContent/ToastContent';
import { postNewCases, setBackofficeStatus } from '../../store/actions/backofficeActions';

export const BackOfficeHomeContainer: React.FC = () => {
    const dispatch = useAppDispatch();
    const backofficeState = useAppSelector(state => state.backoffice);
    const toast = useRef<Toast>(null);

    useEffect(() => {
        if ( toast.current === null ) 
            return;

        if ( backofficeState.status === APIStatus.READY ) {
            toast.current.show({
                severity: "success",
                contentClassName: "backoffice-toast",
                content: (
                    <ToastContent message="New cases inserted successfully." />
                ),
                life: 3000
            })

            dispatch(setBackofficeStatus(APIStatus.IDLE));
        }
        else if ( backofficeState.error && backofficeState.status === APIStatus.IDLE ) {
            toast.current.show({
                severity: "error",
                contentClassName: "backoffice-toast",
                content: (
                    <ToastContent message="Insert of new cases failed." />
                ),
                life: 3000
            });
        } 
    }, [ backofficeState ]);

    return (
        <div>
            <AppHeader />
            <Toast ref={toast} />

            <InsertCasesForm onSubmit={(formData) => dispatch(postNewCases(formData))} />
            <Divider />
        </div>
    )
}

export default BackOfficeHomeContainer;