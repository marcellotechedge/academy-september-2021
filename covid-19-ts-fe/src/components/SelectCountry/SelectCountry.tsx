import React, { useEffect, useRef } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { ToastContent } from '../ToastContent/ToastContent';
import { useAppDispatch, useAppSelector } from '../../store/storeConfiguration';
import { fetchCountriesList } from '../../store/actions/countryActions';

export type SelectCountryProps = {
    className?: string,
    disabled?: boolean,
    style?: React.CSSProperties,
    value?: any,
    onChange: (value: any) => void
}

export const SelectCountry: React.FC<SelectCountryProps> = ({ className, disabled, style, value, onChange }) => {
    const dispatch = useAppDispatch();
    const countryState = useAppSelector(state => state.country);
    const toast = useRef<Toast>(null);

    useEffect(() => {
        if ( !countryState.loaded )
            dispatch(fetchCountriesList());
    }, []);

    useEffect(() => {
        if ( toast.current === null ) return;

        if ( countryState.error ) {
            toast.current.show({
                severity: 'error',
                contentClassName: "select-country-toast",
                content: (
                    <ToastContent message="Error while loading countries." action={
                        <Button type="button" label="Retry" className="p-button-secondary" 
                            onClick={() => dispatch(fetchCountriesList())}
                        />
                    } />
                ),
                sticky: true
            });
        }
        else toast.current.clear();
    }, [ countryState.error ])

    return (
        <>
            <Toast ref={toast} />
            <Dropdown 
                className={className}
                style={style}
                value={value} 
                options={countryState.countries} 
                optionLabel="country"
                optionValue="code"
                onChange={(e) => onChange(e.value)} 
                placeholder="Select a Country"
                disabled={disabled}
            />
        </>
    );
}

export default SelectCountry;