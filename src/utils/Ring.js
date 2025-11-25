export default function Ring({ progress }) {
  const pct = progress * 100;

  return (
    <div style={{ width: 120, height: 120, margin: "0 auto" }}>
      <svg width="120" height="120">
        <circle
          cx="60" cy="60" r="50"
          stroke="#eee"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx="60" cy="60" r="50"
          stroke="#ffb703"
          strokeWidth="10"
          fill="none"
          strokeDasharray={`${pct * 3.14}, 999`}
          style={{ transition: "stroke-dasharray 0.4s ease" }}
        />
      </svg>
    </div>
  );
}
