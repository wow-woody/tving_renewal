import './scss/ZootopiaSection.scss';

const ZootopiaSection = () => {
  return (
    <div className="zootopia-wrapper">
      <section className="glass-frame zootopia-frame">
        <div className="zootopia-section">
          <div className="image-container">
            <img src="/images/주토피아.png" alt="주토피아" />
          </div>
        </div>
      </section>
      <section className="glass-frame zootopia-frame">
        <div className="zootopia-section">
          <div className="image-container">
            <img src="/images/아바타.png" alt="아바타" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ZootopiaSection;
