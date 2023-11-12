import { createContext, useEffect, useState } from "react";

const DatabaseContext = createContext({});

export const DataBaseProvider = ({children}) =>{
  const [cart, setCart] = useState([])
  const [drinks, setDrinks] = useState([
    {
      id: 1,
      name: "Iced Milk Coffee",
      photo: "/assets/image/icecoffee.png",
      description: "Made using freshly brewed coffee, 2% fat milk, a sweet, simple syrup, and a good amount of ice cubes for a refreshing start to the day.",
      category: 1,
      price: 15000,
    },
    {
      id: 2,
      name: "Latte",
      photo: "/assets/image/latte.png",
      description: "Milk coffee that is a made up of one or two shots of espresso, steamed milk and a final, thin layer of frothed milk on top. If you don't drink dairy milk, you can easily swap it for a plant-based alternative like soy, oat or coconut milk.",
      category: 1,
      price: 19000,
    },
    {
      id: 3,
      name: "Honey Orange Juice",
      photo: "/assets/image/orangejuice.png",
      description: "Perfect for increasing springtime agni, astringent honey also helps to dry melting Kapha.",
      category: 7,
      price: 35000,
    },
    {
      id: 4,
      name: "Hot Ginger Juice",
      photo: "/assets/image/gingerjuice.png",
      description: "Ginger Juice is one powerful recipe! It is equally packed with health benefits and flavor. It is a warming, spicy, sweet, and delicious way to get ginger into your diet daily!",
      category: 7,
      price: 29000,
    },
    {
      id: 5,
      name: "Hot Fresh Tea",
      photo: "/assets/image/freshtea.png",
      description: "Fresh tea leaves can be brewed in hot water to create a sensationally smooth and delicious cup of tea. And you can drink it all day! Fresh tea leaves don’t get bitter - just keep adding hot water to your raw fresh tea leaves throughout the day. No need to remove the leaves from your mug if you don’t want to. Plus, the antioxidants go up on the second infusion, so you want to re-infuse them multiple times.",
      category: 2,
      price: 17000,
    },
    {
      id: 6,
      name: "Thai Tea",
      photo: "/assets/image/thaitea.png",
      description: "Thai tea is a worldwide favorite beverage at Thai restaurants, including those in the United States. It’s a culinary combo of Thai street tea and the Western love for sweetened and strongly flavored iced beverages.",
      category: 3,
      price: 25000,
    },
    {
      id: 7,
      name: "Strawberry Cocktail",
      photo: "/assets/image/strawberry.png",
      description: "There’s nothing better than the vibrant, fruity flavor of a ripe strawberry. So why not bottle up that flavor and use it in strawberry alcoholic drinks? Some of our very favorite cocktail recipes use this ripe berry, be it fresh or frozen! Match it with just about any alcohol: rum, tequila, vodka, and champagne all pair perfectly.",
      category: 8,
      price: 39000,
    },
    {
      id: 8,
      name: "Americano",
      photo: "/assets/image/americano.png",
      description: " An americano is just water and espresso. It'll either be served 1/2 and 1/2 or 1/3 espresso to 2/3 water, depending on the coffee shop in question or how you've chosen to brew it. Traditionally, there will be no milk but some people may add it depending on their personal preference.",
      category: 1,
      price: 20000,
    },
    {
      id: 9,
      name: "Cappuccino",
      photo: "/assets/image/capuchino.png",
      description: "The perfect balance of espresso, steamed milk and foam. This coffee is all about the structure and the even splitting of all elements into equal thirds. An expertly made cappuccino should be rich, but not acidic and have a mildly sweet flavouring from the milk.",
      category: 1,
      price: 22000,
    },
    {
      id: 10,
      name: "Black Coffee",
      photo: "/assets/image/blackcoffee.png",
      description: "A beverage made from roasted coffee beans. The beans are ground and soaked in water, which releases their flavor, color, caffeine content, and nutrients. Although coffee is often served hot, it can also be served iced.",
      category: 1,
      price: 15000,
    },
    {
      id: 11,
      name: "Hot Chocolate",
      photo: "/assets/image/chocolate.png",
      description: "Hot chocolate is a thick beverage made of melted, solid chocolate blended with milk, cream, or water. Hot cocoa is much thinner than melted chocolate. Added sugar: Hot cocoa often requires you to add sugar to it to adequately sweeten it.",
      category: 6,
      price: 27000,
    },
    {
      id: 12,
      name: "Matcha Ice Blended",
      photo: "/assets/image/matcha.png",
      description: "Do you prefer your matcha drinks blended? Do you want to leave behind the workout of a vigorous whisk for the carefree control of a blender? Are you trying to kick your addiction to milkshakes and in need of a substitute? Then we have the drink for you!\n Using a blender takes the finesse and guesswork out of the mixing process, so beginners and matcha maniacs alike can create deliciously smooth drinks. Follow this can’t-mess-up recipe to enjoy the creamy goodness of a blended matcha latte in minutes. ",
      category: 4,
      price: 39000,
    },
    {
      id: 13,
      name: "Matcha Ice Blended",
      photo: "/assets/image/matcha.png",
      description: "Do you prefer your matcha drinks blended? Do you want to leave behind the workout of a vigorous whisk for the carefree control of a blender? Are you trying to kick your addiction to milkshakes and in need of a substitute? Then we have the drink for you!\n Using a blender takes the finesse and guesswork out of the mixing process, so beginners and matcha maniacs alike can create deliciously smooth drinks. Follow this can’t-mess-up recipe to enjoy the creamy goodness of a blended matcha latte in minutes. ",
      category: 4,
      price: 39000,
    },
  ])
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Coffee",
      photo: "/images/1.jpg",
      quantity: 5,
    },
    {
      id: 2,
      name: "Tea",
      photo: "/images/2.jpg",
      quantity: 1,
    },
    {
      id: 3,
      name: "Milk Tea",
      photo: "/images/6.jpg",
      quantity: 1,
    },
    {
      id: 4,
      name: "Ice Blended",
      photo: "/images/3.jpg",
      quantity: 1,
    },
    {
      id: 5,
      name: "Soft Drink",
      photo: "/images/9.jpg",
      quantity: 0,
    },
    {
      id: 6,
      name: "Chocolate",
      photo: "/images/4.jpg",
      quantity: 1,
    },
    {
      id: 7,
      name: "Fruit Juice",
      photo: "/images/5.jpg",
      quantity: 2,
    },
    {
      id: 8,
      name: "Cocktail",
      photo: "/images/7.jpg",
      quantity: 1,
    },
    {
      id: 9,
      name: "Shakes",
      photo: "/images/8.jpg",
      quantity: 0,
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
      drink: 12,
      quantity: 1,
      note: ""
    },
    {
      id: 7,
      order: 3,
      drink: 11,
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
      name: "Lu Hoang Anh",
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
      name: "Hoàng Hoài L",
      user: 14,
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
      name: "Lu Hoang Anh",
      user: 3,
      address: "20/8 Lý Thường Kiệt",
      status: "Đang pha chế",
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
      comment: 'Cà phê ngon, giao nhanh',
      rating: 5,
    },
    {
      id: 2,
      user: 3,
      drink: 10,
      comment: 'Cà phê đen nhưng làm quá ngọt',
      rating: 4,
    },{
      id: 3,
      user: 3,
      drink: 2,
      comment: 'Cà phê ngon, giao nhanh',
      rating: 5,
    },{
      id: 4,
      user: 3,
      drink: 9,
      comment: 'Giao hàng quá chậm',
      rating: 2,
    },{
      id: 5,
      user: 14,
      drink: 8,
      comment: 'Cà phê ngon, giao nhanh',
      rating: 5,
    },{
      id: 6,
      user: 14,
      drink: 4,
      comment: 'Thái độ phục vụ chưa tốt',
      rating: 4,
    },{
      id: 7,
      user: 3,
      drink: 5,
      comment: 'Cà phê ngon, giao nhanh',
      rating: 5,
    },{
      id: 8,
      user: 14,
      drink: 6,
      comment: 'Trà sữa không thơm',
      rating: 3,
    },{
      id: 9,
      user: 3,
      drink: 12,
      comment: 'Đá xay mịn, thơm, vị matcha rất ngon',
      rating: 5,
    },{
      id: 10,
      user: 3,
      drink: 11,
      comment: 'Thái độ nhân viên quá tệ',
      rating: 2,
    },
    {
      id: 11,
      user: 14,
      drink: 11,
      comment: 'Thái độ nhân viên quá tệ',
      rating: 2,
    },
  ])

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