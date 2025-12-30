'use client';
import { useState, useMemo } from 'react';
import styles from './ConsultationBooking.module.css';

const SERVICES = [
  { id: 'family', title: 'Family Planning', desc: 'Contraceptive counseling and pregnancy planning support' },
  { id: 'general', title: 'General Health', desc: 'Preventive care and wellness consultations' },
  { id: 'iv', title: 'IV Therapy', desc: 'Intravenous fluids, vitamins, and medication delivery' },
  { id: 'mzima', title: 'Mzima Package', desc: 'Chronic care for diabetes, hypertension, asthma & more' },
  { id: 'prep', title: 'PrEP/PEP', desc: 'HIV prevention and post-exposure prophylaxis guidance' }
];

const TIME_SLOTS = ['10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM'];

const STEP_TITLES = ['Select Service', 'Consent Form', 'Date & Time', 'Your Details'];

export default function ConsultationBooking() {
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    service: '', consent: false, date: '', time: '', recipient: 'myself',
    firstName: '', lastName: '', dob: '', gender: '', phone: '', email: '', notes: ''
  });

  const updateForm = (key: string, val: any) => setForm(prev => ({ ...prev, [key]: val }));

  const canContinue = useMemo(() => {
    switch (step) {
      case 1: return !!form.service;
      case 2: return form.consent;
      case 3: return !!(form.date && form.time);
      case 4: return !!(form.firstName && form.lastName && form.dob && form.gender && form.phone && form.email);
      default: return false;
    }
  }, [step, form]);

  const calendarDays = useMemo(() => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
    const lastDate = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const days = Array(firstDay).fill(null);
    for (let i = 1; i <= lastDate; i++) days.push(i);
    return days;
  }, []);

  const handleNext = () => step < 4 ? setStep(step + 1) : setSuccess(true);
  
  const reset = () => {
    setSuccess(false);
    setStep(1);
    setForm({ service: '', consent: false, date: '', time: '', recipient: 'myself', firstName: '', lastName: '', dob: '', gender: '', phone: '', email: '', notes: '' });
  };

  return (
    <div className={styles.app}>
      <div className={styles.progress}>
        <div className={styles.counter}>
          <span className={styles.current}>{step}</span>
          <span className={styles.divider}>/</span>
          <span className={styles.total}>4</span>
        </div>
        <h3 className={styles.title}>{STEP_TITLES[step - 1]}</h3>
        <div className={styles.track}>
          <div className={styles.fill} style={{ width: `${(step / 4) * 100}%` }} />
        </div>
      </div>

      <div className={styles.card}>
        {step === 1 && (
          <div className={styles.step}>
            <h1>Request Online Consultation</h1>
            <p className={styles.subtitle}>What would you like to discuss?</p>
            <div className={styles.services}>
              {SERVICES.map(s => (
                <label key={s.id} className={`${styles.service} ${form.service === s.id ? styles.active : ''}`}>
                  <input type="radio" name="service" value={s.id} checked={form.service === s.id} onChange={e => updateForm('service', e.target.value)} />
                  <span className={styles.radio} />
                  <div className={styles.content}>
                    <h4>{s.title}</h4>
                    <p>{s.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className={styles.step}>
            <h1>Patient Consent Form</h1>
            <p className={styles.subtitle}>Please review and agree to the terms</p>
            <div className={styles.consent}>
              <h4>Telehealth Consent</h4>
              <p>By agreeing, you consent to YALLAH processing your medical data for consultation, diagnosis, and treatment via telecommunication technologies.</p>
              <ul>
                <li>Authorizing telehealth services for medical evaluation</li>
                <li>Understanding confidentiality protections apply</li>
                <li>Acknowledging potential data disclosure if legally required</li>
                <li>Accepting need for stable internet connection</li>
                <li>Understanding benefits and limitations of remote care</li>
                <li>Recognizing rare security breach possibilities</li>
              </ul>
              <label className={styles.check}>
                <input type="checkbox" checked={form.consent} onChange={e => updateForm('consent', e.target.checked)} />
                <span className={styles.checkmark} />
                <span>I agree to the terms and conditions</span>
              </label>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className={styles.step}>
            <h1>Select Date & Time</h1>
            <p className={styles.subtitle}>Choose your preferred consultation slot</p>
            <div className={styles.datetime}>
              <div className={styles.calSection}>
                <h4>📅 Select Date</h4>
                <div className={styles.calendar}>
                  <div className={styles.calHead}>
                    <button type="button">‹</button>
                    <span>{new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                    <button type="button">›</button>
                  </div>
                  <div className={styles.weekdays}>
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d}>{d}</div>)}
                  </div>
                  <div className={styles.days}>
                    {calendarDays.map((day, i) => (
                      <button 
                        key={i} 
                        type="button"
                        className={`${styles.day} ${form.date.includes(String(day)) ? styles.selected : ''} ${!day ? styles.empty : ''}`}
                        onClick={() => day && updateForm('date', `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`)}
                        disabled={!day}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.timeSection}>
                <h4>🕐 Select Time</h4>
                <div className={styles.info}>⏱️ Duration: 30 Min • Video Call</div>
                <div className={styles.times}>
                  {TIME_SLOTS.map(t => (
                    <button 
                      key={t} 
                      type="button"
                      className={`${styles.slot} ${form.time === t ? styles.selected : ''}`}
                      onClick={() => updateForm('time', t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className={styles.step}>
            <h1>Your Information</h1>
            <p className={styles.subtitle}>Fill in your details to complete booking</p>
            <div className={styles.toggle}>
              <label className={form.recipient === 'myself' ? styles.active : ''}>
                <input type="radio" name="recipient" value="myself" checked={form.recipient === 'myself'} onChange={e => updateForm('recipient', e.target.value)} />
                <span>Myself</span>
              </label>
              <label className={form.recipient === 'dependent' ? styles.active : ''}>
                <input type="radio" name="recipient" value="dependent" checked={form.recipient === 'dependent'} onChange={e => updateForm('recipient', e.target.value)} />
                <span>Dependent</span>
              </label>
            </div>
            <div className={styles.grid}>
              <div className={styles.field}>
                <label>First Name *</label>
                <input type="text" placeholder="Enter first name" value={form.firstName} onChange={e => updateForm('firstName', e.target.value)} />
              </div>
              <div className={styles.field}>
                <label>Last Name *</label>
                <input type="text" placeholder="Enter last name" value={form.lastName} onChange={e => updateForm('lastName', e.target.value)} />
              </div>
              <div className={styles.field}>
                <label>Date of Birth *</label>
                <input type="date" value={form.dob} onChange={e => updateForm('dob', e.target.value)} />
              </div>
              <div className={styles.field}>
                <label>Gender *</label>
                <select value={form.gender} onChange={e => updateForm('gender', e.target.value)}>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className={styles.field}>
                <label>Phone *</label>
                <input type="tel" placeholder="Phone number" value={form.phone} onChange={e => updateForm('phone', e.target.value)} />
              </div>
              <div className={styles.field}>
                <label>Email *</label>
                <input type="email" placeholder="Email address" value={form.email} onChange={e => updateForm('email', e.target.value)} />
              </div>
            </div>
            <div className={styles.field}>
              <label>Additional Notes</label>
              <textarea placeholder="Any other details..." value={form.notes} onChange={e => updateForm('notes', e.target.value)} rows={3} />
            </div>
          </div>
        )}

        <div className={styles.actions}>
          {step > 1 && <button type="button" className={styles.back} onClick={() => setStep(step - 1)}>← Back</button>}
          <button type="button" className={styles.continue} onClick={handleNext} disabled={!canContinue}>
            {step === 4 ? 'Schedule Event' : 'Continue'}
          </button>
        </div>
      </div>

      {success && (
        <div className={styles.modal} onClick={() => setSuccess(false)}>
          <div className={styles.modalCard} onClick={e => e.stopPropagation()}>
            <button type="button" className={styles.close} onClick={() => setSuccess(false)}>×</button>
            <div className={styles.icon}>✓</div>
            <h2>Booking Complete!</h2>
            <p>Your consultation has been scheduled successfully</p>
            <div className={styles.modalActions}>
              <button type="button" className={styles.secondary} onClick={reset}>Book Another</button>
              <button type="button" className={styles.primary} onClick={() => setSuccess(false)}>Done</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}