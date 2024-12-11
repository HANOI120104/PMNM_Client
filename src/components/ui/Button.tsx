/**
 * Copyright (c) ATA_TLU.
 *
 * This source code is licensed under the GPL V3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
// Button.tsx
// Button.tsx (or wherever your Button component is defined)

import React from 'react';

interface ButtonProps {
    text: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;  // Add the disabled prop
}

const Button: React.FC<ButtonProps> = ({ text, onClick, disabled }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled} // Apply the disabled prop to the button
            className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${disabled ? 'bg-gray-400 cursor-not-allowed' : ''}`}
        >
            {text}
        </button>
    );
};

export default Button;

