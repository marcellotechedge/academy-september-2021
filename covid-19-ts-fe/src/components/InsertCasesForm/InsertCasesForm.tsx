import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';

export type InsertCasesFormData = {
    continent: string,
    country: string,
    weeklyCases: number,
    weeklyDeaths: number,
    notificationRate: number
}

export type InsertCasesFormProps = {
    onSubmit: (data: InsertCasesFormData) => void
};

export const InsertCasesForm: React.FC<InsertCasesFormProps> = ({ onSubmit }) => {
    const [ formState, setFormState ] = useState<InsertCasesFormData>({
        continent: '',
        country: '',
        weeklyCases: 0,
        weeklyDeaths: 0,
        notificationRate: 0
    });

    return (
        <>
            <h3 style={{ textAlign: 'center' }}>Insert a new case</h3>
            <div className="covid-app-form-small">
                <div className="covid-app-field">
                    <label>Continent</label>
                    <div>
                        <InputText 
                            value={formState.continent} 
                            onChange={(e) => setFormState((state) => ({ ...state, continent: e.target.value }))} 
                        />
                    </div>
                </div>
                <div className="covid-app-field">
                    <label>Country</label>
                    <div>
                        <InputText 
                            value={formState.country} 
                            onChange={(e) => setFormState((state) => ({ ...state, country: e.target.value }))} 
                        />
                    </div>
                </div>
                <div className="covid-app-field">
                    <label>Weekly Cases</label>
                    <div>
                        <InputNumber 
                            value={formState.weeklyCases} 
                            onChange={(e) => setFormState((state) => ({ ...state, weeklyCases: e.value }))} 
                            min={0}
                        />
                    </div>
                </div>
                <div className="covid-app-field">
                    <label>Weekly Deaths</label>
                    <div>
                        <InputNumber 
                            value={formState.weeklyDeaths} 
                            onChange={(e) => setFormState((state) => ({ ...state, weeklyDeaths: e.value }))} 
                            min={0}
                        />
                    </div>
                </div>
                <div className="covid-app-field">
                    <label>Notification Rate</label>
                    <div>
                        <InputNumber 
                            value={formState.notificationRate} 
                            onChange={(e) => setFormState((state) => ({ ...state, notificationRate: e.value }))} 
                            min={0}
                            mode="decimal" 
                            minFractionDigits={2}
                        />
                    </div>
                </div>

                <div className="covid-app-field">
                    <div>
                        <Button
                            label="Insert"
                            onClick={() => onSubmit(formState)}
                            disabled={Object.keys(formState).filter(key => 
                                formState[key as keyof InsertCasesFormData] === null || 
                                formState[key as keyof InsertCasesFormData] === ""
                            ).length > 0}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}