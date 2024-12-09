/**
 * Copyright (c) ATA_TLU.
 *
 * This source code is licensed under the GPL V3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
interface FormField {
    label: string;
    placeholder: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface FormProps {
    fields: FormField[];
    onSubmit: () => void;
}

const Form: React.FC<FormProps> = ({ fields, onSubmit }) => {
    return (
        <form className="container mx-auto text-center" onSubmit={onSubmit}>
            {fields.map((field, index) => (
                <div key={index} className="my-4">
                    <label>{field.label}</label>
                    <input
                        type={field.type || 'text'}
                        placeholder={field.placeholder}
                        value={field.value}
                        onChange={field.onChange}
                        className="w-full border-b-2 px-2"
                    />
                </div>
            ))}
            <button type="submit" className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
                Submit
            </button>
        </form>
    );
};

export default Form;
