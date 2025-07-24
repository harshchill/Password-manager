import React, { useRef, useState, useEffect } from "react";
import eyeImg from "../assets/eye.png";
import hiddenImg from "../assets/hidden.png";

const Hero = () => {
  const ref = useRef();
  const passwordRef = useRef();

  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

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

  const savePassword = () => {
    setPasswordArray([...passwordArray, form]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));
    console.log([...passwordArray, form]);
    // console.log(form);
  };

  return (
    <div>
      <div className="  p-4  bg-white">
        <div className="text-center w-3/4 mx-auto bg-neutral-0 p-2 rounded-md ">
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
            <div className="flex gap-5">
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
                className="flex gap-3 justify-center items-center hover:bg-emerald-300 mx-auto bg-emerald-400 px-6 py-2 rounded-full font-semibold hover:border hover:border-emerald-900"
              >
                <lord-icon
                  src="https://cdn.lordicon.com/awjeikyj.json"
                  trigger="hover"
                ></lord-icon>{" "}
                Add Password
              </button>
            </div>
          </div>
        </div>
        <div className="passwords">
          <div className="text-xl font-bold text-center m-2">
            Your Passwords
          </div>
          {passwordArray.length == 0 && (
            <div className="text-lg mt-16 text-center">
              There are no passwords...
            </div>
          )}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-5/6 mx-auto bg-emerald-100 ">
              <thead>
                <tr className="bg-emerald-800 text-white ">
                  <th className="p-2">Website</th>
                  <th className="p-2">Username</th>
                  <th className="p-2">Password</th>
                </tr>
              </thead>
              <tbody>
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="p-2 flex justify-center items-center gap-2  text-center border border-white">
                        {item.site}
                        <lord-icon
                          src="https://cdn.lordicon.com/xuoapdes.json"
                          trigger="hover"
                        ></lord-icon>
                      </td>
                      <td className="p-2  text-center border border-white">
                        <div className="flex justify-center items-center gap-2">
                          {item.username}
                          <lord-icon
                            src="https://cdn.lordicon.com/xuoapdes.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </td>
                      <td className="p-2  text-center border border-white">
                        <div className="flex justify-center items-center gap-2">
                          {item.password}
                        <lord-icon
                          src="https://cdn.lordicon.com/xuoapdes.json"
                          trigger="hover"
                        ></lord-icon>
                        </div>
                        
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
