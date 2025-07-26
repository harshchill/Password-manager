import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import eyeImg from "../assets/eye.png";
import hiddenImg from "../assets/hidden.png";

const Hero = () => {
  const ref = useRef();
  const passwordRef = useRef();

  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async () => {
    let res = await fetch("http://localhost:3000/");
    let passwords = await res.json();
    setPasswordArray(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const copyText = (text) => {
    toast.success("Copied to clipboard!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    navigator.clipboard.writeText(text);
  };

  const handleEye = () => {
    if (ref.current.src.includes(hiddenImg)) {
      ref.current.src = eyeImg;
      passwordRef.current.type = "password";
    } else {
      alert("This will show you the password");
      ref.current.src = hiddenImg;
      passwordRef.current.type = "text";
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const savePassword = async () => {
    if (
      form.site.length < 3 ||
      form.username.length < 3 ||
      form.password.length < 3
    ) {
      toast.error("Invalid format!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      // localStorage.setItem(
      //   "passwords",
      //   JSON.stringify([...passwordArray, form])
      // );
      await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })

      await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })
      console.log([...passwordArray, form]);
      setform({ site: "", username: "", password: "" });
      toast.success("Password saved!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  //Handle delete
  const deletePassword = async (id) => {
    let c = confirm("this will delete the password!");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })

       toast.success("Password Deleted!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  //Handle edit
  const editPassword = async (id) => {
    setform({ ...passwordArray.filter((i) => i.id === id)[0], id: id });
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  return (
    <main className="  p-4  bg-white">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable={true}
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="text-center w-full md:w-3/4 mx-auto bg-neutral-0 p-2 rounded-md ">
        <div className="text-4xl font-bold m-2">
          Pass <span className="text-emerald-400">MG</span>
        </div>
        <div className="text-md m-2">dont worry if ya forget em!</div>
        <div className="flex flex-col gap-4 p-4">
          <input
            name="site"
            onChange={handleChange}
            value={form.site}
            placeholder="Enter Website URL"
            className="border border-emerald-300 rounded-md px-2 py-1"
            type="text"
          />
          <div className="flex gap-5 md:flex-row flex-col">
            <input
              name="username"
              onChange={handleChange}
              value={form.username}
              placeholder="Enter Username"
              className=" w-full border border-emerald-300 rounded-md px-2 py-1"
              type="text"
            />
            <div className="relative">
              <input
                name="password"
                ref={passwordRef}
                onChange={handleChange}
                value={form.password}
                placeholder="Password"
                className="w-full border border-emerald-300 rounded-md px-2 py-1"
                type="password"
              />
              <img
                onClick={handleEye}
                ref={ref}
                className="cursor-pointer absolute right-[7px] top-[7px]"
                src="src\assets\eye.png"
                width={20}
                alt=""
              />
            </div>
          </div>
          <div>
            <button
              onClick={savePassword}
              className="flex gap-3 justify-center items-center  hover:bg-emerald-300 mx-auto bg-emerald-400 px-6 py-2 rounded-full font-semibold "
            >
              <lord-icon
                src="https://cdn.lordicon.com/awjeikyj.json"
                trigger="hover"
              ></lord-icon>{" "}
              Save Password
            </button>
          </div>
        </div>
      </div>
      <div className="passwords">
        <div className="text-xl font-bold text-center m-2">Your Passwords</div>
        {passwordArray.length == 0 && (
          <div className="text-lg mt-16 text-center">
            There are no passwords...
          </div>
        )}
        {passwordArray.length !== 0 && (
          <table className="table-auto min-w-full md:w-5/6 mx-auto overflow-x-hidden bg-emerald-100 m-10 overflow-hidden rounded-md">
            <thead>
              <tr className="bg-emerald-800 text-white ">
                <th className="p-2 ">Website</th>
                <th className="p-2">Username</th>
                <th className="p-2">Password</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {passwordArray.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="p-2  border border-white">
                      <div className="flex justify-center items-center gap-2 overflow-x-hidden text-center ">
                        <a href={item.site} target="_blank">
                          {item.site}
                        </a>
                        <lord-icon
                          style={{ width: "20px" }}
                          onClick={() => {
                            copyText(item.site);
                          }}
                          src="https://cdn.lordicon.com/xuoapdes.json"
                          trigger="hover"
                        ></lord-icon>
                      </div>
                    </td>
                    <td className="p-2  text-center border border-white">
                      <div
                        onClick={() => {
                          copyText(item.username);
                        }}
                        className="flex justify-center items-center gap-2"
                      >
                        {item.username}
                        <lord-icon
                          style={{ width: "20px" }}
                          src="https://cdn.lordicon.com/xuoapdes.json"
                          trigger="hover"
                        ></lord-icon>
                      </div>
                    </td>
                    <td className="p-2  text-center border border-white">
                      <div
                        onClick={() => {
                          copyText(item.password);
                        }}
                        className="flex justify-center items-center gap-2"
                      >
                        {"*".repeat(item.password.length)}
                        <lord-icon
                          style={{ width: "20px" }}
                          src="https://cdn.lordicon.com/xuoapdes.json"
                          trigger="hover"
                        ></lord-icon>
                      </div>
                    </td>
                    <td className="p-2  border border-white">
                      <div className="flex gap-2  justify-center  text-center">
                        <span
                          className="m-2"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          <MdEditSquare size={20} />
                        </span>
                        <span
                          className="m-2"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <MdDelete size={20} />
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
};

export default Hero;
