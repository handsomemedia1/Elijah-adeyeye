import { useState, useRef } from 'react';
import { HiSearch, HiX } from 'react-icons/hi';

const countryCodes = [
  { code: 'NG', dial: '+234', flag: '🇳🇬', name: 'Nigeria' },
  { code: 'GH', dial: '+233', flag: '🇬🇭', name: 'Ghana' },
  { code: 'KE', dial: '+254', flag: '🇰🇪', name: 'Kenya' },
  { code: 'ZA', dial: '+27', flag: '🇿🇦', name: 'South Africa' },
  { code: 'US', dial: '+1', flag: '🇺🇸', name: 'United States' },
  { code: 'GB', dial: '+44', flag: '🇬🇧', name: 'United Kingdom' },
];

export default function SearchBar({ onSearch, loading, onReset }) {
  const [input, setInput] = useState('');
  const [country, setCountry] = useState(countryCodes[0]);
  const [shake, setShake] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      inputRef.current?.focus();
      return;
    }
    // Prepend dial code if user didn't include it
    let phoneInput = input.trim();
    if (!phoneInput.startsWith('+') && !phoneInput.startsWith('0')) {
      phoneInput = country.dial + phoneInput;
    }
    onSearch(phoneInput, country.code);
  };

  const handleClear = () => {
    setInput('');
    onReset?.();
    inputRef.current?.focus();
  };

  return (
    <form className={`ni-search ${shake ? 'ni-search--shake' : ''}`} onSubmit={handleSubmit}>
      <div className="ni-search__inner glass-strong">
        <select
          className="ni-search__country"
          value={country.code}
          onChange={(e) => setCountry(countryCodes.find(c => c.code === e.target.value))}
        >
          {countryCodes.map(c => (
            <option key={c.code} value={c.code}>{c.flag} {c.dial}</option>
          ))}
        </select>
        
        <div className="ni-search__divider" />
        
        <input
          ref={inputRef}
          type="tel"
          className="ni-search__input"
          placeholder="Enter phone number..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoComplete="off"
        />
        
        {input && (
          <button type="button" className="ni-search__clear" onClick={handleClear}>
            <HiX />
          </button>
        )}
        
        <button
          type="submit"
          className={`ni-search__btn ${loading ? 'ni-search__btn--loading' : ''}`}
          disabled={loading}
        >
          <HiSearch />
          <span>{loading ? 'Scanning...' : 'Investigate'}</span>
        </button>
      </div>
      <p className="ni-search__hint">Enter with or without country code · Defaults to Nigeria (+234)</p>
    </form>
  );
}
