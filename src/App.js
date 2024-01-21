import React, { useLayoutEffect, useState } from "react";
import "./global.css";

const App = () => {
  const [name, setname] = useState("");
  const [mNumber, setmNumber] = useState("");
  const [mainList, setmainList] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered = mainList.filter(
      (contact) =>
        contact.name.toLowerCase().includes(term.toLowerCase()) ||
        contact.mNumber.includes(term)
    );

    setFilteredContacts(filtered);
  };

  const deleteHandler = (i) => {
    let copylist = [...mainList];
    copylist.splice(i, 1);
    setmainList(copylist);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (name.trim() === "" || mNumber.trim() === "") {
      setError("Name and Mobile Number are required.");
      return;
    }
    if (mNumber.trim().length < 10) {
      setError("Mobile Number should be at least 10 digits.");
      return;
    }
    if (mNumber.trim().length > 10) {
      setError("Mobile Number can not be greater than 10 digits.");
      return;
    }
    setError("");
    setmainList([...mainList, { name, mNumber }]);
    setname("");
    setmNumber("");
  };

  let renderContacts = mainList;

  if (searchTerm !== "") {
    renderContacts = filteredContacts;
  }

  let renderItem = (
    <h1 className="text-xl font-bold text-center p-5 border-t-2 border-b-2">
      contacts not added yet !
    </h1>
  );
  if (mainList.length > 0) {
    renderItem = renderContacts.map((t, i) => {
      return (
        <li key={i} className="flex justify-between border-t-2 border-b-2 p-3">
          <div className="flex justify-between w-27">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            <div className=" font-bold">
              <h4>{t.name}</h4>
              <h5>{t.mNumber}</h5>
            </div>
          </div>
          <button
            onClick={() => {
              deleteHandler(i);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </li>
      );
    });
  }

  return (
    <div>
      <div className="header bg-black text-white px-6 py-4 text-4xl text-center font-bold">
        <h1>Phone Book</h1>
      </div>
      <div className="form">
        <form
          onSubmit={submitHandler}
          className=" flex flex-col justify-center items-center"
        >
          <h1 className="text-3xl font-bold font-serif p-5">Add Contact</h1>
          <div className="name text-xl font-bold">
            <label htmlFor="">Name</label> <br />
            <input
              className=" border-2 border-slate-400 mb-5 px-3 py-3 text-xl font-bold rounded"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
          </div>
          <div className="number text-xl font-bold">
            <label htmlFor="">Mobile Number</label> <br />
            <input
              type="number"
              className="border-2 border-slate-400 mb-5 px-3 py-3 text-xl font-bold rounded"
              placeholder="Enter your contact here"
              value={mNumber}
              onChange={(e) => {
                setmNumber(e.target.value);
              }}
            />
          </div>
          <button className="button bg-blue-700 px-7 py-3 text-white font-bold rounded">
            Add
          </button>
          <p className="text-red-500 mt-5">{error}</p>
        </form>
      </div>

      <div className="search-bar mb-5">
        <label className="font-bold ml-5" htmlFor="search">Search Contacts: </label>
        <input
          type="text"
          id="search"
          className="border-2 border-slate-400 px-3 py-2 rounded"
          placeholder="Enter name or number"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="itemlist text-black p-4 mt-5">
        <ul>{renderItem}</ul>
      </div>
    </div>
  );
};

export default App;
