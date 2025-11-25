import { useEffect, useState } from "react";

export default function useCustomerId() {
  const [id, setId] = useState(null);

  useEffect(() => {
    let x = localStorage.getItem("customer_id");
    if (!x) {
      x = Math.random().toString(36).substring(2, 10);
      localStorage.setItem("customer_id", x);
    }
    setId(x);
  }, []);

  return id;
}
