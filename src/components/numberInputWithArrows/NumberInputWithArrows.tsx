import { ChangeEvent, FunctionComponent, useRef } from "react";
import "./NumberInputWithArrows.scss";
import { SlArrowUp } from "react-icons/sl";
import { SlArrowDown } from "react-icons/sl";

interface NumberInputWithArrowsProps {
  value: number;
  max: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}

const NumberInputWithArrows: FunctionComponent<NumberInputWithArrowsProps> = ({
  value,
  max,
  setValue,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const increaseNumberHandler = () => {
    inputRef.current?.focus();
    if (value < max) {
      setValue(value + 1);
    }
  };

  const decreaseNumberHandler = () => {
    inputRef.current?.focus();
    if (value > 0) {
      setValue(value - 1);
    }
  };

  const valueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const valueAsNumber = parseInt(e.target.value);
    if (valueAsNumber <= max && valueAsNumber >= 0) {
      setValue(valueAsNumber);
    } else {
      setValue(0);
    }
  };

  return (
    <div className="number-container">
      <i onClick={increaseNumberHandler} className="up-arrow">
        <SlArrowUp />
      </i>
      <input
        type="number"
        value={value}
        onChange={valueChangeHandler}
        max={max}
        min={0}
        ref={inputRef}
      />
      <i onClick={decreaseNumberHandler} className="down-arrow">
        <SlArrowDown />
      </i>
    </div>
  );
};

export default NumberInputWithArrows;
