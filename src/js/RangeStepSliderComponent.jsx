import React, { useEffect, useState } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import './RangeStepSliderComponent.css';
import Form from 'react-bootstrap/Form';

const RangeStepSliderComponent = () => {
  const [rangeValue, setRangeValue] = useState(50);

  // useEffect(() => {
  //   console.log(rangeValue);
  // }, [setRangeValue]);

  return (
    <>
      <div className="slider_bar">
        <RangeSlider
          value={rangeValue}
          step={10}
          onChange={(e) => setRangeValue(e.target.value)}
          variant="secondary"
        />
      </div>
      <div className="slider_num">
        <Form.Control value={rangeValue} />
      </div>
    </>
  );
};

export default RangeStepSliderComponent;
