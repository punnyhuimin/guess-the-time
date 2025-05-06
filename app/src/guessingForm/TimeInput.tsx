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
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
        width: '200px', // !TODO hardcoded ok?
      }}
    >
      <span style={{ fontSize: '24px' }}>{t(inputTimeField)}:</span>
      <input
        type="number"
        max={maxValue}
        min={0}
        value={inputTime}
        onChange={handleChange}
        style={{
          //   backgroundColor: 'var(--button-color)',
          //   color: 'white',
          padding: '4px 4px',
          borderRadius: '6px',
          //   border: '1px solid #ccc',
          //   fontSize: '14px',
          //   height: '24px',
          width: '24px',
          //   // textAlign: 'right',
        }}
      />
    </div>
  );
};

export default TimeSelect;
