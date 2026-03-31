export default function BackgroundLayer({ imageUrl, loaded, blur, dim, positionX, positionY, stars }) {
  return (
    <>
      <div
        id="bgImage"
        className={loaded ? "loaded" : ""}
        style={{
          backgroundImage: imageUrl ? `url(${imageUrl})` : "",
          filter: `blur(${blur}px)`,
          transform: `scale(${1 + blur * 0.004})`,
          backgroundPosition: `${positionX}% ${positionY}%`,
        }}
      />
      <div className="bg-overlay" style={{ background: `rgba(4, 6, 18, ${dim / 100})` }} />
      <div className="bg-gradient" />
      <div className="stars">
        {stars.map((star) => (
          <div key={star.id} className="star" style={star.style} />
        ))}
      </div>
    </>
  );
}
