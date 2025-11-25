export default function Card({ children }) {
  return (
    <div style={{
      background: "#fff",
      padding: 20,
      borderRadius: 12,
      boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
      animation: "fadeIn 0.4s ease"
    }}>
      {children}
    </div>
  );
}
