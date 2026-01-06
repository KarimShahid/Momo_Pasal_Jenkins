import { useEffect, useState } from "react";
import "./App.css";

type MenuItem = {
  id: number;
  name: string;
  price: number;
};

function App() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Fetching from:", import.meta.env.VITE_API_URL);
    
    fetch(`${import.meta.env.VITE_API_URL}/menu`)  // Done so that frontend container can communicate with backend container
      .then((res) => {
        console.log("Response received:", res.status);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Data received:", data);
        setMenu(data);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError("Cannot connect to backend. Is it running on port 4000?");
      });
  }, []);

  return (
    <div className="container">
      <h1>🥟 Himalayan Momo Stall</h1>
      <p className="subtitle">Fresh momos from the Himalayas</p>
      
      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
      
      <div className="menu">
        {menu.length === 0 && !error && <p>Loading menu...</p>}
        
        {menu.map((item) => (
          <div className="card" key={item.id}>
            <h3>{item.name}</h3>
            <p className="price">Rs. {item.price}</p>
            <button>Order Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;