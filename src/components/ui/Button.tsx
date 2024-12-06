// Button.tsx
import React from 'react';

interface ButtonProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    text: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, text }) => {
    return (
        <button
            onClick={onClick}
            className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
        >
            {text}
        </button>
    );
};

export default Button;
