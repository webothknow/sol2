import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './PuiLocalTimeDisplayComponent.css';

const PuiLocalTimeDisplay = ({ locale, appendtext, interval, offset }) => {
  // Initial variables
  let time, dispText;

  // Reference for text
  const [value, setValue] = useState();

  // Updates internal timer based on interval
  const updateTimer = () => {
    let currTime = Date.now();
    let tempTime = new Date(currTime + offset * 3.6e6);
    time = new Date(tempTime).toLocaleString(locale);
    dispText = time + ' ' + appendtext;

    setValue(dispText);
  };

  // Timer interval setter
  setInterval(() => {
    updateTimer();
  }, interval);

  return <span className="local-timer-display">{value}</span>;
};

// List of valid locales
const localeArray = [
  'ar-SA',
  'bn-BD',
  'bn-IN',
  'cs-CZ',
  'da-DK',
  'de-AT',
  'de-CH',
  'de-DE',
  'el-GR',
  'en-AU',
  'en-CA',
  'en-GB',
  'en-IE',
  'en-IN',
  'en-NZ',
  'en-US',
  'en-ZA',
  'es-AR',
  'es-CL',
  'es-CO',
  'es-ES',
  'es-MX',
  'es-US',
  'fi-FI',
  'fr-BE',
  'fr-CA',
  'fr-CH',
  'fr-FR',
  'he-IL',
  'hi-IN',
  'hu-HU',
  'id-ID',
  'it-CH',
  'it-IT',
  'ja-JP',
  'ko-KR',
  'nl-BE',
  'nl-NL',
  'no-NO',
  'pl-PL',
  'pt-BR',
  'pt-PT',
  'ro-RO',
  'ru-RU',
  'sk-SK',
  'sv-SE',
  'ta-IN',
  'ta-LK',
  'th-TH',
  'tr-TR',
  'zh-CN',
  'zh-HK',
  'zh-TW',
];

PuiLocalTimeDisplay.defaultProps = {
  locale: 'ja-JP',
  appendtext: '',
  interval: 1000,
  offset: 0,
};

PuiLocalTimeDisplay.propTypes = {
  locale: PropTypes.oneOf(localeArray),
  appendtext: PropTypes.string,
  interval: PropTypes.number,
  offset: PropTypes.number,
};

export default PuiLocalTimeDisplay;
