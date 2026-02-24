type TextInputProps = {
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  placeholder: string;
  error?: string[];
  disabled?: boolean;
};
const TextInput = ({
  value,
  onChange,
  onBlur,
  placeholder,
  error = [],
  disabled = false,
}: TextInputProps) => {
  return (
    <div>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={error && error.length > 0 ? "input-error" : ""}
        disabled={disabled}
      />
      {error && error.length > 0 && (
        <ul className="error-list">
          {error.map((err, idx) => (
            <li key={idx}>{err}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TextInput;
