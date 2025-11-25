import React, { useState, useEffect } from "react";
import { getStatus, getToken } from "../utils/api";
import useCustomerId from "../utils/useCustomerId";
import SuccessModal from "./SuccessModal";
import Ring from "../utils/Ring";
import Card from "../utils/Card";

export default function CustomerView() {
  const customerId = useCustomerId();
  const [status, setStatus] = useState(null);
  const [qrToken, setQrToken] = useState(null);
  const [qrExp, setQrExp] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch customer status
  const refreshStatus = async () => {
    const resp = await getStatus(customerId);
    setStatus(resp);
  };

  // Generate rotating QR every 60s
  const refreshToken = async () => {
    const resp = await getToken(customerId);
    setQrToken(resp.token);
    setQrExp(resp.expires);
  };

  useEffect(() => {
    refreshStatus();
    refreshToken();
    const intA = setInterval(refreshStatus, 5000);
    const intB = setInterval(refreshToken, 60000);
    return () => {
      clearInterval(intA);
      clearInterval(intB);
    };
  }, []);

  if (!status) return <div style={{ padding: 20 }}>Loading...</div>;

  const { stamps, lifetimeStamps, freeCrepesAvailable, nextFreeIn } = status;

  // Light fade-in animation
  const fadeStyle = {
    opacity: 1,
    animation: "fadeIn 0.5s ease"
  };

  return (
    <div style={{ maxWidth: 420, margin: "0 auto", padding: 20, textAlign: "center" }}>
      <style>
        {`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        `}
      </style>

      {/* Progress Ring */}
      <div style={fadeStyle}>
        <Ring progress={(stamps % 2) / 2} />
      </div>

      {/* Info Card */}
      <div style={{ marginTop: 20, ...fadeStyle }}>
        <Card>
          <h2>Your Progress</h2>
          <p><strong>Stamps:</strong> {stamps}</p>
          <p><strong>Lifetime Stamps:</strong> {lifetimeStamps}</p>
          <p><strong>Next free crêpe in:</strong> {nextFreeIn}</p>

          {freeCrepesAvailable > 0 && (
            <p style={{ color: "green", fontWeight: "bold" }}>
              🎉 Free crêpe available!
            </p>
          )}
        </Card>
      </div>

      {/* QR Token */}
      <div style={{ marginTop: 30, ...fadeStyle }}>
        <Card>
          <p>Show this QR to staff:</p>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrToken}`}
            alt="QR"
            style={{ width: 200, height: 200 }}
          />
        </Card>
      </div>

      {/* Success Modal */}
      <SuccessModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </div>
  );
}
