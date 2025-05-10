import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface TimeSelectProps {
  inputTime: number;
  maxValue: number;
  inputTimeField: string;
  handleTimeInputChange: (
    field: string,
    value: number,
    maxValue: number,
  ) => void;
}

const TimeSelect: FC<TimeSelectProps> = ({
  inputTime,
  maxValue,
  inputTimeField,
  handleTimeInputChange,
}) => {
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const number = Number(value);
    if (!isNaN(number)) {
      handleTimeInputChange(inputTimeField, number, maxValue);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        width: '60%',
        marginBottom: '8px',
      }}
    >
      <span style={{ fontSize: '24px', textAlign: 'left', flexGrow: 1 }}>
        {t(inputTimeField)}:
      </span>
      <input
        type="number"
        max={maxValue}
        min={0}
        value={inputTime}
        onChange={handleChange}
        style={{
          padding: '4px 4px',
          borderRadius: '6px',
          width: '60px', // Adjust width of the input as needed
          textAlign: 'right', // Align the number text to the right
        }}
      />
    </div>
  );
};

export default TimeSelect;
