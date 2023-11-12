import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({children}) =>{
  const [auth, setAuth] = useState({});
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      email: "admin@gmail.com",
      name: "Loc Minh Hieu",
      password: "admin1",
      phone: "0837128983",
      address: "Dai hoc bach khoa TPHCM",
      type: 1,
      photo: "/images/profile_pic.jpg"
    },
    {
      id: 2,
      email: "staff@gmail.com",
      name: "Nguyen Kieu Anh",
      password: "123",
      phone: "0837382822",
      address: "Ky tuc xa dai hoc quoc gia",
      type: 2,
      photo: "/images/staff_profile.jpg"
    },
    {
      id: 3,
      email: "customer@gmail.com",
      name: "Lu Hoang Anh",
      password: "123456",
      phone: "0837128983",
      address: "Dai hoc bach khoa Q10",
      type: 3,
      point: 20000,
      photo: "/images/customer_profile.png"
    },
    {
      id: 4,
      name: "Nguyễn Văn A",
      email: "A12@gmail.com",
      password: "123",
      address: "34/30 Nguyễn Thị Minh Khai",
      type: 2,
      phone: "0598736213",
      photo: "/images/staff_profile.jpg"
    },
    {
      id: 5,
      name: "Lê Xuân B",
      password: "123",
      email: "B12@gmail.com",
      address: "3/31 Tạ Quang Bửu",
      type: 2,
      phone: "0833658792",
      photo: "/images/staff_profile.jpg"

    },
    {
      id: 6,
      name: "Phạm Thị X",
      email: "123@gmail.com",
      password: "123",
      address: "5/12 Phạm Hồng Thái",
      type: 2,
      phone: "0823658741",
      photo: "/images/staff_profile.jpg"

    },
    {
      id: 7,
      name: "Nòng Văn T",
      password: "123",
      email: "34n@gmail.com",
      address: "34/33 Nguyễn Thị Minh Khai",
      type: 2,
      phone: "0832328590",
      photo: "/images/staff_profile.jpg"

    },
    {
      id: 8,
      name: "Nguyễn Lê D",
      email: "23@gmail.com",
      password: "123",
      address: "34/33 Nguyễn Thị Minh Khai",
      type: 2,
      phone: "0236589745",
      photo: "/images/staff_profile.jpg"

    },
    {
      id: 9,
      name: "Trần Bá M",
      email: "56yen@gmail.com",
      password: "123",
      address: "12/7 Phạm Hồng Thái",
      type: 2,
      phone: "0648952156",
      photo: "/images/staff_profile.jpg"

    },
    {
      id: 10,
      name: "Lê Văn X",
      email: "Ahgen@gmail.co",
      password: "123",
      address: "4/36 Phạm Văn Đồng",
      type: 2,
      phone: "0832328590",
      photo: "/images/staff_profile.jpg"

    },
    {
      id: 11,
      name: "Phạm Văn Khá",
      email: "A345@gmail.com",
      password: "123",
      address: "5/37 Nguyễn Bỉnh Khiêm",
      type: 2,
      phone: "0832123590",
      photo: "/images/staff_profile.jpg"

    },
    {
      id: 12,
      name: "Trần Việt K",
      email: "6yjn@gmail.com",
      password: "123",
      address: "34/38 Nguyễn Thị Minh Khai",
      type: 2,
      phone: "0682928595",
      photo: "/images/staff_profile.jpg"

    },
    {
      id: 13,
      name: "Hoàng Hoài L",
      email: "1222n@gmail.com",
      password: "123",
      address: "10/39 Chu Văn An",
      type: 2,
      phone: "0832328590",
      photo: "/images/staff_profile.jpg"

    },
    {
      id: 14,
      name: "Hoàng Hoài L",
      email: "1222sn@gmail.com",
      password: "123",
      address: "10/39 Chu Văn An",
      type: 3,
      point: 20000,
      phone: "0832328590",
      photo: "/images/staff_profile.jpg"
    },
  ]);

  return (
    <AuthContext.Provider value={{ auth,setAuth, accounts, setAccounts }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;