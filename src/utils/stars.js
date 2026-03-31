export function createStars(count = 100) {
  return Array.from({ length: count }, (_, index) => {
    const size = Math.random() * 2 + 0.5;
    return {
      id: index,
      style: {
        width: `${size}px`,
        height: `${size}px`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        "--d": `${2 + Math.random() * 4}s`,
        "--delay": `${Math.random() * 5}s`,
        "--op": `${0.3 + Math.random() * 0.6}`,
      },
    };
  });
}
