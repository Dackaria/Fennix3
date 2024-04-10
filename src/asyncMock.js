const products=
[
    {
       id:1,
       category:"mochila",
       name:"Mochilera",
       img:"https://m.media-amazon.com/images/I/71AXXWkdW5L._AC_UY1000_.jpg",
       price:30.000,
       stock:10,
       description:"Mochila de viaje"
    },
    {
        id:2,
        category:"mochila",
        name:"School",
        img:"https://i5.walmartimages.com.mx/mg/gm/3pp/asr/76df869e-3f84-406f-8630-7325d9c9af9b.5708cbded52b8fc26329c1cf5edce438.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
        price:15.000,
        stock:10,
        description:"Mochila escolar"
     },
     {
        id:3,
        category:"cartera",
        name:"Shine",
        img:"https://http2.mlstatic.com/D_NQ_NP_642256-MLA47331435419_092021-O.webp",
        price:10.000,
        stock:10,
        description:"cartera de mano/fiesta"
     },
     {
        id:4,
        category:"cartera",
        name:"Home",
        img:"https://elboyero.com/18865-large_default/cartera-de-cuero-amplia-con-divisiones-el-boyero.jpg",
        price:35.000,
        stock:10,
        description:"Cartera amplia/diaria"
     },
     {
        id:5,
        category:"billetera",
        name:"Kids",
        img:"https://d22fxaf9t8d39k.cloudfront.net/2870a9468c4c501ab7271c309657a0fe5dfb55ef1e183c4157b7c3e38c464cd3118676.jpeg",
        price:15.000,
        stock:10,
        description:"Billetera infantil"
     },
     {
        id:6,
        category:"billetera",
        name:"Dama",
        img:"https://i.pinimg.com/736x/57/c0/90/57c090997c674917dc440885ef6d3e3e.jpg",
        price:25.000,
        stock:10,
        description:"Billetera Dama"
     }
]

export const getProducts = () => {
    return new Promise((resolve) => {
        setTimeout(()=>{
            resolve(products);
    }    , 100)
})
}

export const getProductsByCategory = (category) => {
    return new Promise((resolve)=>{
        setTimeout(() => {
            resolve(products.filter(prod => prod.category === category))
        }, 100)
    })
}

export const getProductsById = (itemId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products.find(prod => prod.id === Number(itemId)))
        }, 100)
    })
}

export default products