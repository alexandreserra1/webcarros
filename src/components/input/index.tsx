import { RegisterOptions, UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface InputProps<T extends FieldValues> {
  type: string;
  placeholder: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: string;
  rules?: RegisterOptions;
}

export function Input<T extends FieldValues>({ name, placeholder, type, register, rules, error }: InputProps<T>) {
  return (
    <div>
      <input
        className="w-full border-2 rounded-md h-11 px-2"
        placeholder={placeholder}
        type={type}
        {...register(name, rules)}
        id={name as string}  // Você pode precisar fazer uma conversão para string aqui
      />
      {error && <p className="my-1 text-red-500">{error}</p>}
    </div>
  );
}
