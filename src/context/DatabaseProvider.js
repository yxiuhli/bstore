
import { createContext, useEffect, useState } from "react";

const DatabaseContext = createContext({});

export const DataBaseProvider = ({children}) =>{
  const [cart, setCart] = useState([])
  const [drinks, setDrinks] = useState([
    {
      id: 1,
      name: "Set 1",
      photo: "/assets/image/set1.jpg",
      description: "Set chậu chuối kiểng trưng dịp tết.",
      category: 1,
      price: 150000,
    },
    {
      id: 2,
      name: "Set 2",
      photo: "/assets/image/set2.png",
      description: "Set chậu lưỡi hổ.",
      category: 1,
      price: 789000,
    },
    {
      id: 3,
      name: "Trầu lá xẻ",
      photo: "/assets/image/traulaxe.jpg",
      description: "Trầu lá xẻ",
      category: 2,
      price: 35000,
    },
    {
      id: 4,
      name: "Đa búp đỏ",
      photo: "/assets/image/dabupdo.png",
      description: "Vài dòng mô tả",
      category: 3,
      price: 29000,
    },
    {
      id: 5,
      name: "Hoa thủy tiên",
      photo: "/assets/image/hoathuytien.png",
      description: "Vài dòng mô tả",
      category: 4,
      price: 17000,
    },
    {
      id: 6,
      name: "Chậu thủy tinh",
      photo: "/assets/image/chauthuytinh.jpg",
      description: "Vài dòng mô tả",
      category: 5,
      price: 25000,
    },
    {
      id: 7,
      name: "Cây hoa giấy",
      photo: "/assets/image/hoagiay.png",
      description: "Vài dòng mô tả",
      category: 6,
      price: 39000,
    },
    {
      id: 8,
      name: "Đinh lăng xẩm thạch",
      photo: "/assets/image/dinhlangxamthach.jpg",
      description: "Vài dòng mô tả",
      category: 2,
      price: 27000,
    },
    {
      id: 9,
      name: "Dương xỉ",
      photo: "/assets/image/duongxi.png",
      description: "Vài dòng mô tả",
      category: 3,
      price: 39000,
    },
    {
      id: 10,
      name: "Cây dây nhện",
      photo: "/assets/image/daynhen.png",
      description: "Vài dòng mô tả",
      category: 4,
      price: 39000,
    },
  ])
  
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Set chậu và cây",
      photo: "/images/cat1.jpg",
      quantity: 2,
    },
    {
      id: 2,
      name: "Cây trong nhà",
      photo: "/images/cat2.jpg",
      quantity: 2,
    },
    {
      id: 3,
      name: "Cây ban công",
      photo: "/images/cat3.jpg",
      quantity: 2,
    },
    {
      id: 4,
      name: "Cây để bàn",
      photo: "/images/cat4.jpg",
      quantity: 2,
    },
    {
      id: 5,
      name: "Chậu - đồ trang trí",
      photo: "/images/cat5.jpg",
      quantity: 1,
    },
    {
      id: 6,
      name: "Cây sân vườn",
      photo: "/images/cat6.jpg",
      quantity: 1,
    },
  ]);

  const [foodInOrder, setFoodInOrder] = useState([
    {
      id: 1,
      order: 1,
      drink: 1,
      quantity: 2,
      note: ""
    },
    {
      id: 2,
      order: 1,
      drink: 2,
      quantity: 2,
      note: "1 ly ít ngọt"
    },
    {
      id: 3,
      order: 1,
      drink: 3,
      quantity: 2,
      note: "1 ly ít đá"
    },
    {
      id: 4,
      order: 1,
      drink: 10,
      quantity: 1,
      note: "Không đá"
    },
    {
      id: 5,
      order: 2,
      drink: 8,
      quantity: 2,
      note: ""
    },
    {
      id: 6,
      order: 2,
      drink: 6,
      quantity: 1,
      note: ""
    },
    {
      id: 7,
      order: 3,
      drink: 8,
      quantity: 1,
      note: ""
    },
    {
      id: 8,
      order: 3,
      drink: 9,
      quantity: 1,
      note: ""
    },
    {
      id: 9,
      order: 3,
      drink: 6,
      quantity: 2,
      note: ""
    },
  ])

  const [orders, setOrders] = useState([
    {
      id: 1,
      name: "Daboo",
      user: 3,
      address: "34/35 Nguyễn Thị Minh Khai",
      status: "Đã giao",
      phone: "0832328590",
      date: "09/12/2022 10:30",
      total: 148000,
      method: "COD",
      discount: 20000,
    },
    {
      id: 2,
      name: "TBT",
      user: 4,
      address: "12/5 Tạ Quang Bửu",
      status: "Chờ xác nhận",
      phone: "0833658792",
      date: "09/12/2022 13:30",
      total: 94000,
      method: "Credit",
      discount: 0,
    },
    {
      id: 3,
      name: "Daboo",
      user: 3,
      address: "20/8 Lý Thường Kiệt",
      status: "Đang xử lý",
      phone: "0236589745",
      date: "12/12/2022 15:30",
      total: 114000,
      method: "Debit",
      discount: 0,
    },
  ]);

  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      user: 3,
      drink: 1,
      comment: 'Giao hàng nhanh',
      rating: 5,
    },
    {
      id: 2,
      user: 3,
      drink: 10,
      comment: 'Cây đẹp',
      rating: 4,
    },{
      id: 3,
      user: 4,
      drink: 2,
      comment: 'Cây khỏe đẹp',
      rating: 5,
    },{
      id: 4,
      user: 4,
      drink: 9,
      comment: 'Giao hàng chậm',
      rating: 3,
    },{
      id: 5,
      user: 3,
      drink: 8,
      comment: 'Rất thích',
      rating: 5,
    },{
      id: 6,
      user: 3,
      drink: 4,
      comment: 'OK',
      rating: 4,
    },{
      id: 7,
      user: 4,
      drink: 5,
      comment: 'Tuyệt vời',
      rating: 5,
    },{
      id: 8,
      user: 3,
      drink: 6,
      comment: '...',
      rating: 3,
    },{
      id: 9,
      user: 3,
      drink: 3,
      comment: 'Shop uy tín',
      rating: 5,
    },{
      id: 10,
      user: 4,
      drink: 5,
      comment: 'Giao lâu cây héo',
      rating: 2,
    },
    {
      id: 11,
      user: 3,
      drink: 9,
      comment: 'Shop tư vấn nhiệt tình',
      rating: 5,
    },
  ])

  const savedDrinks = localStorage.getItem('drinks');
  const savedCategories = localStorage.getItem('categories');
  const savedInOrder = localStorage.getItem('inorder');
  const savedOrders = localStorage.getItem('orders');
  const savedFeedbacks = localStorage.getItem('feedbacks');
  useEffect(()  => {
    if (savedDrinks) {
      console.log(savedDrinks);
      setDrinks(JSON.parse(savedDrinks));
    }
    if (savedCategories) {
      console.log(savedCategories);
      setCategories(JSON.parse(savedCategories));
    }
    if (savedInOrder) {
      console.log(savedInOrder);
      setFoodInOrder(JSON.parse(savedInOrder));
    }
    if (savedOrders) {
      console.log(savedOrders);
      setOrders(JSON.parse(savedOrders));
    }
    if (savedFeedbacks) {
      console.log(savedFeedbacks);
      setFeedbacks(JSON.parse(savedFeedbacks));
    }
  },[]);

  useEffect(()=>{
    categories.map((cate)=>cate.quantity = 0)
    drinks.map((drink)=>categories.map((cate)=>cate.id === drink.category?cate.quantity++ : <></>))
  }, [drinks, categories])

  return(
    <DatabaseContext.Provider value={{ drinks, setDrinks, categories, setCategories, orders, setOrders, feedbacks, setFeedbacks, cart, setCart, foodInOrder, setFoodInOrder }}>
      {children}
    </DatabaseContext.Provider>
  )
}

export default DatabaseContext;