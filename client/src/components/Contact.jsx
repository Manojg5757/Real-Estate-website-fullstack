import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Contact = ({ listing }) => {
  const [users, setUsers] = useState();
  const[message,setMessage] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/user/" + listing.userRef);
      setUsers(res.data);
    };
    fetchData();
  }, [listing.userRef]);
  console.log(users);

  const onchange = (e)=>{
   setMessage(e.target.value)
  }
console.log(message)
  return (
    <div className=" flex flex-col gap-4">
      <div>
        Contact <span className="font-semibold">{users?.username}</span>
        {listing.name}
      </div>
      <textarea
        name="text"
        id="text"
        placeholder="Type Here..."
        rows='2'
        value={message}
        onChange={onchange}
        className="w-full p-3 rounded-lg"
      />
      <Link to={`mailto:${users.email}?subject=Regarding ${listing.name}&body=${message}`}>
        <button className="bg-slate-700 p-3 text-white w-full rounded">Send Message</button>
      </Link>
    </div>
  );
};

export default Contact;
