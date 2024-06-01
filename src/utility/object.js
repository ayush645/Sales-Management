export const createobj = (data) => {
  return {
    customers: [
      {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2),
        name: data.Name,
        color: [182, 73, 99],
        email: data.Email,
        pincode: data.Address,
        location_name: data.Address,
        type: "C",
        profile_pic: null,
        gst: "",
        status: "Progess",
        phone_number: 12345678,
      },
    ],
    products: [
      {
        id: 209,
        display_id: 8,
        owner: 1079,
        name: data.select,
        category: data.select,
        characteristics: data.select,
        features: "",
        brand: data.select,
        sku: [
          {
            id: 248,
            selling_price: 54,
            max_retail_price: 44,
            amount: data.kg,
            unit: "kg",
            quantity_in_inventory: 0,
            product: 209,
          },
          {
            id: 247,
            selling_price: 32,
            max_retail_price: 32,
            amount: data.kg,
            unit: "kg",
            quantity_in_inventory: 0,
            product: 209,
          },
          {
            id: 246,
            selling_price: 23,
            max_retail_price: 21,
            amount: data.kg,
            unit: "kg",
            quantity_in_inventory: 1,
            product: 209,
          },
        ],
        updated_on: data.functional_data.from_value.date,
        adding_date: data.functional_data.from_value.date,
      },
    ],

    initialSaleOrders: [
      {
        customer_id: 11908,
        items: [
          {
            sku_id: 220,
            price: data.functional_data.from_value.cost,
            quantity: 12,
          },
        ],
        paid: false,
        invoice_no: "Invoice - 1212121",
        invoice_date: data.functional_data.from_value.date,
      },
    ],
  };
};
