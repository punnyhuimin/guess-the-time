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
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{ fontSize: '24px', textAlign: 'left', flex: 1 }}>
        {t(inputTimeField)}:
      </span>
      <input
        type="number"
        max={maxValue}
        min={0}
        value={inputTime}
        onChange={handleChange}
        style={{
          padding: '8px 8px',
          borderRadius: '8px',
          width: '60px',
          textAlign: 'right',
        }}
      />
    </div>
  );
};

export default TimeSelect;
