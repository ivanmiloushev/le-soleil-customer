import React from "react";

export default function SuccessModal({ visible, onClose }) {
  if (!visible) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.box}>
        <h2 style={{ margin: 0 }}>🎉 Congratulations!</h2>
        <p>Your free crêpe has been redeemed.</p>
        <button style={styles.btn} onClick={onClose}>OK</button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0,
    width: "100%", height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    animation: "fadeIn 0.3s ease"
  },
  box: {
    background: "#fff",
    borderRadius: 12,
    padding: 20,
    width: 280,
    textAlign: "center",
    animation: "fadeIn 0.3s ease"
  },
  btn: {
    marginTop: 10,
    padding: "10px 20px",
    borderRadius: 8,
    border: "none",
    background: "#333",
    color: "#fff",
    cursor: "pointer"
  }
};
