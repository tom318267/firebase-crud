import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const Homepage = () => {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [users, setUsers] = useState([]);

  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
  };

  // const updateAge = async (id, age) => {
  //   const userDoc = doc(db, "users", id);
  //   const newFields = { age: age + 1 };
  //   await updateDoc(userDoc, newFields);
  // };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  const updateAge = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <h1>
            {user.name} - {user.age}
          </h1>
          <button
            onClick={() => updateAge(user.id, user.age)}
            className="bg-purple-500 text-white p-2 rounded-md"
          >
            Increase Age
          </button>
          <button
            className="bg-red-500 text-white p-2 rounded-md"
            onClick={() => deleteUser(user.id)}
          >
            Delete User
          </button>
        </div>
      ))}
      <div className="flex flex-col w-1/2 gap-2 mx-auto mt-20">
        <input
          onChange={(e) => setNewName(e.target.value)}
          className="border pl-2"
          type="text"
          placeholder="Name"
        />
        <input
          onChange={(e) => setNewAge(e.target.value)}
          className="border pl-2"
          type="number"
          placeholder="Age"
        />
        <button
          onClick={createUser}
          className="bg-purple-500 text-white p-2 rounded-md"
        >
          Create User
        </button>
      </div>
    </div>
  );
};

export default Homepage;
