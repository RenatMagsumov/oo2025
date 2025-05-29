import { useRef } from "react";
import { toast } from "react-toastify";

function AddHaldaja() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const addHaldaja = () => {
    const newHaldaja = {
      nimi: nameRef.current?.value,
      email: emailRef.current?.value,
    };

    if (!newHaldaja.nimi || !newHaldaja.email) {
      toast.error("Täida kõik väljad!");
      return;
    }

    fetch("http://localhost:5074/haldajad", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newHaldaja),
    }).then((res) => {
      if (res.ok) {
        toast.success("Haldaja lisatud!");
        if (nameRef.current) nameRef.current.value = "";
        if (emailRef.current) emailRef.current.value = "";
      } else {
        toast.error("Midagi läks valesti...");
      }
    });
  };

  return (
    <div>
      <h2>Lisa uus haldaja</h2>
      <label>Nimi</label>
      <input type="text" ref={nameRef} />
      <label>Email</label>
      <input type="email" ref={emailRef} />
      <button onClick={addHaldaja}>Lisa haldaja</button>
    </div>
  );
}

export default AddHaldaja;
