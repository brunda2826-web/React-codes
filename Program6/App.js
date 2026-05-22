import React, { useState } from 'react';
import './App.css';

// Program 6: BCSL657B - VTU React Lab
// React Form: name, email, password with validation.
// - All fields required, email format check, min password length
// - Error messages, red borders on invalid fields
// - Show/Hide password toggle, client-side sanitization
// - Prevent submission until all fields pass validation

function App() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const sanitize = (str) => str.replace(/[<>]/g, '');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: sanitize(value) });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
    setSubmitted(false);
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required.';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email (e.g., user@domain.com).';
    }
    if (!form.password) {
      newErrors.password = 'Password is required.';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);
    setErrors({});
  };

  return (
    <div className="App">
      <div className="form-card">
        <h2>VTU BCSL657B – Program 6: Form Validation</h2>

        {submitted && (
          <div className="success-banner">
            ✅ Form submitted successfully!<br />
            Name: <b>{form.name}</b> | Email: <b>{form.email}</b>
          </div>
        )}

        <div className="field-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className={`field ${errors.name ? 'invalid' : ''}`}
            placeholder="Enter your name"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="field-group">
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={`field ${errors.email ? 'invalid' : ''}`}
            placeholder="example@domain.com"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="field-group">
          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              className={`field ${errors.password ? 'invalid' : ''}`}
              placeholder="Min 6 characters"
            />
            <button
              type="button"
              className="toggle-pw"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '🙈 Hide' : '👁 Show'}
            </button>
          </div>
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;
