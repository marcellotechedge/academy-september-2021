import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Country } from '../../store/reducers/countryReducer';

export type SelectCountryProps = {
    countries: Country[],
    className?: string,
    disabled?: boolean,
    style?: React.CSSProperties,
    value?: any,
    onChange: (value: any) => void
}

export const SelectCountry: React.FC<SelectCountryProps> = ({ className, countries, disabled, style, value, onChange }) => {
    return (
        <Dropdown 
            className={className}
            style={style}
            value={value} 
            options={countries} 
            optionLabel="country"
            optionValue="code"
            onChange={(e) => onChange(e.value)} 
            placeholder="Select a Country"
            disabled={disabled}
        />
    );
}

export default SelectCountry;