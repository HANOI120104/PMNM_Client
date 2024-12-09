/**
 * Copyright (c) ATA_TLU.
 *
 * This source code is licensed under the GPL V3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
// InputField.tsx
import React from 'react';

interface InputFieldProps {
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, name, value, onChange, placeholder }) => {
    return (
        <div className="grid grid-cols-3 items-center text-left">
            <label htmlFor={name} className=" px-2 py-1 col-span-1">{label}</label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="border-b-2 px-2 py-1 col-span-2"
                placeholder={placeholder}
            />
        </div>
    );
};

export default InputField;
