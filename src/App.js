import React, { useState } from "react";
import whitelist from "../whitelist.json";

function App() {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState(null);

  const checkAddress = () => {
    const input = address.trim().toLowerCase();
    const normalized = input.startsWith("ronin:") ? input : input.replace("0x", "ronin:");
    const found = whitelist.find(entry => entry.address.toLowerCase() === normalized);
    setResult(found || false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
      <h1 className="text-2xl font-bold mb-4">Roninmon WL Checker</h1>
      <input
        className="border px-4 py-2 w-full max-w-md rounded"
        type="text"
        placeholder="Enter your wallet address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button
        onClick={checkAddress}
        className="bg-blue-600 text-white px-6 py-2 rounded mt-4"
      >
        Check Wallet
      </button>

      {result === false && (
        <p className="mt-4 text-lg text-red-500">❌ Not whitelisted.</p>
      )}

      {result && (
        <div className="mt-4 text-lg text-green-600 text-center">
          ✅ <strong>{result.address}</strong> is whitelisted!
          <br />
          WL Type: <strong>{result.type}</strong>
          <br />
          Eligible Mints: <strong>{result.mints}</strong>
        </div>
      )}
    </div>
  );
}

export default App;
