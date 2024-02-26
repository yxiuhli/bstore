import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({children}) =>{
  const [auth, setAuth] = useState({});
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      email: "admin@gmail.com",
      name: "Quản trị viên",
      password: "admin1",
      phone: "0837128983",
      address: "Quận 1, TP.HCM",
      type: 1,
      photo: "/images/profile_pic.jpg"
    },
    {
      id: 2,
      email: "staff@gmail.com",
      name: "Nhân viên 1",
      password: "123",
      phone: "0837382822",
      address: "Quận 1, TP.HCM",
      type: 2,
      photo: "/images/staff_profile.jpg"
    },
    {
      id: 3,
      email: "customer@gmail.com",
      name: "Daboo",
      password: "123456",
      phone: "0837128983",
      address: "Quận 1, TP.HCM",
      type: 3,
      point: 20000,
      photo: "/images/customer_profile.png"
    },
    {
      id: 4,
      email: "customer2@gmail.com",
      name: "TBT",
      password: "123456",
      phone: "0837128983",
      address: "Quận 1, TP.HCM",
      type: 3,
      point: 20000,
      photo: "/images/customer_profile.png"
    },
  ]);
  const savedAccounts = localStorage.getItem('accounts');

  useEffect(()  => {
    if (savedAccounts) {
      setAccounts(JSON.parse(savedAccounts));
    }
  },[]);

  return (
    <AuthContext.Provider value={{ auth,setAuth, accounts, setAccounts }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;