const Sequelize = require('sequelize');
const sequelize = new Sequelize('sqlite:ItemInventory.sqlite')

// // Test connection 
// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.')
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     })

// item ที่ขายจะต้องมี ชื่อสินค้า, รายละเอียดสินค้า, ราคาขาย, วันที่เปิดขาย, วันที่เลิกขาย
// เมื่อลูกค้าซื้อ Item แล้วจะได้รับเป็น code (โดย code อาจถูกบันทึกไว้ล่วงหน้า หรือ อาจถูกสร้างหลังจากซื้อ ก็ได้)
// item สามารถจัดโปรโมชั่นลดราคาในช่วงเวลาที่กำหนดได้ เช่น ปกติ ราคา 150 บาท จัดโปรเดือนมกราคม ลดราคาเป็น 100 บาท

const Item = sequelize.define('Item', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: Sequelize.STRING,
    description: Sequelize.TEXT,
    base_price: Sequelize.INTEGER
})

const ItemOffer = sequelize.define('item_offer', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    offer_id: {
      type: Sequelize.INTEGER,
      unique: 'item_offer'
    },
    item_id: {
      type: Sequelize.INTEGER,
      unique: 'item_offer'
    }
})

const Offer = sequelize.define('Offer', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    description: Sequelize.TEXT,
    price: Sequelize.INTEGER,
    discount: Sequelize.INTEGER,
    open_offer: Sequelize.DATE,
    close_offer: Sequelize.DATE
})


const SellTransaction = sequelize.define('SellTransaction', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    // offer_id: Sequelize.INTEGER,
    // activated: Sequelize.BOOLEAN,
    code: Sequelize.STRING
})


Item.belongsToMany(Offer, {
    through: {
        model: ItemOffer,
        unique: false
    },
    foreignKey: 'item_id',
    constraints: false
})
Offer.belongsToMany(Item, {
    through: {
        model: ItemOffer,
        unique: false
    },
    foreignKey: 'offer_id',
    constraints: false
})


// Item.belongsToMany(Offer, 
//     { through: 'ItemOffer', foreignKey: 'itemId' })
// Offer.belongsToMany(Item, 
//     { through: 'ItemOffer', foreignKey: 'offerId' })

// Offer.belongsToMany(SellTransaction, 
//     { through: 'Transactions', foreignKey: 'offerId' })
//   SellTransaction.belongsToMany(Offer, { through: 'ItemOffer', foreignKey: 'transactionId' })


sequelize.sync({force:true}).then(() => {
    //crate Items
    itemA = Item.create({
        name: 'Item A',
        description: 'This is a item-A',
        base_price: 500
    })
    itemB = Item.create({
        name: 'Item B',
        description: 'This is a item-B',
        base_price: 265
    })
    itemC = Item.create({
        name: 'Item C',
        description: 'This is a item-C',
        base_price: 1400
    })


    //create offers
    offerA = Offer.create({
        price: 500,
        discount: 0,
        description: "Defaullt offer for item A",
        open_offer: new Date(2018, 1, 1),
        close_offer: 0
    })
    
    offerB = Offer.create({
        price: 1850,
        discount: 315,
        description: "Bundle package for item A + B + C",
        open_offer: new Date(2018, 9, 1),
        close_offer: new Date(2018, 9, 30)
    })





})
.then(() => {

    Item.findAll().then(items => {
        console.log("All users are: ")
        console.log(items)
        })

    Offer.findAll().then(items => {
        console.log("All offer are: ")
        console.log(items)
    })
})

