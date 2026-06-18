import { useState } from 'react';
import { HiExclamation, HiCheck } from 'react-icons/hi';
import { reportCategories } from '../../data/numIntelData';

export default function ReportForm({ phone, onSubmit, submitting, submitSuccess }) {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category) return;
    const success = await onSubmit({
      phone,
      category,
      description: description.trim() || null,
    });
    if (success) {
      setCategory('');
      setDescription('');
      setShowForm(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="ni-report-success glass">
        <HiCheck className="ni-report-success__icon" />
        <p>Report submitted! Thank you for protecting the community.</p>
      </div>
    );
  }

  if (!showForm) {
    return (
      <button className="ni-report-trigger btn btn--outline" onClick={() => setShowForm(true)}>
        <HiExclamation /> Report This Number
      </button>
    );
  }

  return (
    <form className="ni-report glass" onSubmit={handleSubmit}>
      <h4 className="ni-report__title">
        <HiExclamation /> Report {phone}
      </h4>
      
      <div className="ni-report__field">
        <label className="ni-report__label">Category *</label>
        <select
          className="ni-report__select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select a category...</option>
          {reportCategories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="ni-report__field">
        <label className="ni-report__label">Description (optional)</label>
        <textarea
          className="ni-report__textarea"
          placeholder="Describe what happened..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={500}
          rows={3}
        />
        <span className="ni-report__charcount">{description.length}/500</span>
      </div>

      <div className="ni-report__actions">
        <button type="button" className="btn btn--outline btn--sm" onClick={() => setShowForm(false)}>
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn--primary btn--sm"
          disabled={!category || submitting}
        >
          {submitting ? 'Submitting...' : 'Submit Report'}
        </button>
      </div>
    </form>
  );
}
