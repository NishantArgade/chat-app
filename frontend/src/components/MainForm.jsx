import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MainForm = () => {
  const [data, setData] = useState({ name: "", room: "" });
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const validation = () => {
    if (!data.name) {
      setErr("Please enter your name");
      return true;
    }
    if (!data.room) {
      setErr("Please select your room");
      return true;
    }
    setErr("");
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validation()) {
      navigate(`/chat/${data.room}`, { state: data });
    }
  };

  return (
    <div className="px-3 py-4 shadow bg-white text-dark border rounded row">
      <form action="" onSubmit={handleSubmit}>
        <div className="from-group mb-4">
          <h2 className="text-warning mb-4">Welcome to Chatclub</h2>
        </div>
        <div className="from-group mb-4">
          <input
            type="text"
            className="form-control bg-light"
            name="name"
            placeholder="Enter Name"
            onChange={handleChange}
          />
        </div>
        <div className="from-group mb-4">
          <select
            name="room"
            className="form-select bg-light"
            onChange={handleChange}
          >
            <option value="">Select Room</option>
            <option value="gaming">Gaming</option>
            <option value="coding">Coding</option>
            <option value="socialMedia">Social Media</option>
          </select>
        </div>
        <button className="btn btn-warning w-100 mb-2">Submit</button>
        {err ? <small className="text-danger">{err}</small> : ""}
      </form>
    </div>
  );
};

export default MainForm;
