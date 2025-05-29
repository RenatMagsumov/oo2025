import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Haldaja } from "../models/Haldaja";

function AddWord() {
  const typeRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [haldajad, setHaldajad] = useState<Haldaja[]>([]);
  const [selectedHaldaja, setSelectedHaldaja] = useState<number | null>(null);

  useEffect(() => {
    fetch("http://localhost:5074/haldajad")
      .then(res => res.json())
      .then(json => setHaldajad(json));
  }, []);

  const addWord = () => {
    if (!typeRef.current?.value || !descriptionRef.current?.value || selectedHaldaja === null) {
      toast.error("Täida kõik väljad!", { autoClose: 2000 });
      return;
    }

    const newWord = {
      type: typeRef.current.value,
      description: descriptionRef.current.value,
      haldaja: {
        id: selectedHaldaja
      }
    };

    fetch("http://localhost:5074/sonad", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newWord),
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Sõna lisatud!", { autoClose: 1500 });
          if (typeRef.current) typeRef.current.value = "";
          if (descriptionRef.current) descriptionRef.current.value = "";
          setSelectedHaldaja(null);
        } else {
          toast.error("Midagi läks valesti...", { autoClose: 2000 });
        }
      });
  };

  return (
    <div>
      <label>Sõna</label> <br />
      <input ref={typeRef} type="text" /> <br />

      <label>Tähendus</label> <br />
      <textarea ref={descriptionRef} /> <br />

      <label>Haldaja</label> <br />
      <select
        value={selectedHaldaja ?? ""}
        onChange={(e) => setSelectedHaldaja(Number(e.target.value))}
      >
        <option value="" disabled>Vali haldaja</option>
        {haldajad.map(h => (
          <option key={h.id} value={h.id}>{h.nimi}</option>
        ))}
      </select>

      <br />
      <button onClick={addWord}>Lisa sõna</button>
    </div>
  );
}

export default AddWord;
