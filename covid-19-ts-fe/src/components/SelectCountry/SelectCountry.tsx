import React from 'react';
import { Dropdown } from 'primereact/dropdown';

export type SelectCountryProps = {
    countries: string[],
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
            onChange={(e) => onChange(e.value)} 
            placeholder="Select a Country"
            disabled={disabled}
        />
    );
}

export default SelectCountry;