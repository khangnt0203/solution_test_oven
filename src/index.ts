// internal data types
type ShopingItemType = {
  title: string;
  price: number;
  currency: string;
  date: string;
};
interface INodeElement {
  firstName: string;
  lastName: string;
  age: number;
  birthDate: string;
  shoppingItemsList?: ShopingItemType[];
}
type Chat = {
  title: string;
  nodesList: INodeElement[];
};

// external data types
type Timestamp = {
  seconds: number;
  nanos: number;
};
type ExtShopingItemType = {
  Title: string;
  Price: number;
  Currency: string;
  Date: Timestamp;
};
interface IExtNodeElement {
  FirstName: string;
  LastName: string;
  Age: number;
  BirthDate: Timestamp;
  ShoppingItems: ExtShopingItemType[];
}
type ExtChat = {
  Title: string;
  ChatItems: IExtNodeElement[];
};

// converter ShopingItemType
function converterShopingItemType(
  internal: ShopingItemType
): ExtShopingItemType {
  let time: Timestamp = {
    seconds: new Date(internal.date).getSeconds(),
    nanos: new Date(internal.date).getSeconds() * 1000000,
  };

  let external: ExtShopingItemType = {
    Title: internal.title,
    Price: internal.price,
    Currency: internal.currency,
    Date: time,
  };
  return external;
}
//data test
let dataInternalShopingItem: ShopingItemType = {
  title: "Laptop",
  price: 1200000,
  currency: "VND",
  date: "2023-02-04T07:34:42.000Z",
};

console.log(converterShopingItemType(dataInternalShopingItem));
//-------------------------------------------------------------------------------------------------
// converter INodeElement
function converterINodeElement(internal: INodeElement): IExtNodeElement {
  let time: Timestamp = {
    seconds: new Date(internal.birthDate).getSeconds(),
    nanos: new Date(internal.birthDate).getSeconds() * 1000000,
  };
  let external: IExtNodeElement = {
    FirstName: internal.firstName,
    LastName: internal.lastName,
    Age: internal.age,
    BirthDate: time,
    ShoppingItems:
      internal.shoppingItemsList?.map((e) => ({
        Title: e.title,
        Currency: e.currency,
        Date: {
          seconds: new Date(e.date).getSeconds(),
          nanos: new Date(e.date).getSeconds() * 1000000,
        },
        Price: e.price,
      })) || [],
  };
  return external;
}
// data test
let dataInternalNodeElement: INodeElement = {
  firstName: "Nguyen",
  lastName: "Khang",
  age: 23,
  birthDate: "2023-02-04T07:50:57.000Z",
  shoppingItemsList: [
    {
      title: "CPU",
      price: 1500000,
      currency: "VND",
      date: "2023-02-04T07:52:22.000Z",
    },
  ],
};

console.log(converterINodeElement(dataInternalNodeElement));

//-----------------------------------------------------------------------------------------------------
//converter Chat
function converterChat(internal: Chat): ExtChat {
  let external: ExtChat = {
    Title: internal.title,
    ChatItems: internal.nodesList?.map((e) => ({
      FirstName: e.firstName,
      LastName: e.lastName,
      Age: e.age,
      BirthDate: {
        seconds: new Date(e.birthDate).getSeconds(),
        nanos: new Date(e.birthDate).getSeconds() * 1000000,
      },
      ShoppingItems:
        e.shoppingItemsList?.map((values) => ({
          Title: values.title,
          Currency: values.currency,
          Date: {
            seconds: new Date(values.date).getSeconds(),
            nanos: new Date(values.date).getSeconds() * 1000000,
          },
          Price: values.price,
        })) || [],
    })),
  };

  return external;
}
//data test
let dataInternalChat: Chat = {
  title: "Hello world!",
  nodesList: [
    {
      firstName: "Nguyen",
      lastName: "Khang",
      age: 23,
      birthDate: "2023-02-04T08:15:56.000Z",
      shoppingItemsList: [
        {
          title: "Monitor",
          currency: "VND",
          price: 3700000,
          date: "2023-02-04T08:20:13.000Z",
        },
      ],
    },
  ],
};

console.log(converterChat(dataInternalChat));
