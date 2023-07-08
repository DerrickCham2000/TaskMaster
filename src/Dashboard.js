import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import ToDo from "./ToDo.js"
import "./Dashboard.css";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc?.docs[0]?.data();
      setName(data?.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading, name]);
  return (
    <div>
        <ToDo/>
        <div className="logout">
            <div className="logout-container">
                Logged in as
                <div>{name}</div>
                <div>{user?.email}</div>
                <button className="logout-button" onClick={logout}>
                Logout
                </button>
            </div>
        </div>
    </div>
  );
}
export default Dashboard;