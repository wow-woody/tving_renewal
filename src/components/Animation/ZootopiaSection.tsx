import './scss/ZootopiaSection.scss';

const ZootopiaSection = () => {
  return (
    <div className="zootopia-wrapper">
      <section className="glass-frame zootopia-frame">
        <div className="zootopia-section">
          <div className="image-container" style={{ position: 'relative' }}>
            <img src="/images/주토피아.png" alt="주토피아" />
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0,0,0,0.55)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
              }}
            >
              <button
                style={{
                  fontSize: '2.2rem',
                  fontWeight: 800,
                  color: '#fff',
                  background: 'rgba(255,255,255,0.12)',
                  border: 'none',
                  borderRadius: '32px',
                  padding: '32px 64px',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                className="zootopia-buy-btn"
              >
                구매하기
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="glass-frame zootopia-frame">
        <div className="zootopia-section">
          <div className="image-container" style={{ position: 'relative' }}>
            <img src="/images/아바타.png" alt="아바타" />
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0,0,0,0.55)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
              }}
            >
              <button
                style={{
                  fontSize: '2.2rem',
                  fontWeight: 800,
                  color: '#fff',
                  background: 'rgba(255,255,255,0.12)',
                  border: 'none',
                  borderRadius: '32px',
                  padding: '32px 64px',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                className="zootopia-buy-btn"
              >
                구매하기
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ZootopiaSection;
