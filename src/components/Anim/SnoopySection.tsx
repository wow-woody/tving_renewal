import './scss/SnoopySection.scss';

const SnoopySection = () => {
  const snoopyCards = [
    { id: 1, img: '/images/스누피1.png', name: '스누피 1' },
    { id: 2, img: '/images/스누피2.png', name: '스누피 2' },
    { id: 3, img: '/images/스누피3.png', name: '스누피 3' },
    { id: 4, img: '/images/스누피4.png', name: '스누피 4' },
    { id: 5, img: '/images/스누피5.png', name: '스누피 5' },
    { id: 6, img: '/images/스누피6.png', name: '스누피 6' },
  ];

  return (
    <section className="snoopy-section">
      <h2 className="section-title">찰리 브라운의 발렌타인데이</h2>
      <div className="snoopy-grid">
        {snoopyCards.map((card) => (
          <div key={card.id} className="snoopy-card">
            <img src={card.img} alt={card.name} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SnoopySection;
