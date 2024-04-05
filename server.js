const express = require("express");
const app = express();

const db = require("./config");

/*--------------------------Configuración para los JSON, escupe y recibe.-------------------*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/*-------------------------POST--------------------------------------*/
app.post("/api/AbarroteDonRufino/product", (req, res) => {
    const product = req.body;
    //Guardar en la base de datos
    db.insert(product) //En la base de datos //Inserta el producto, información recopilada del body
        .into("products") //En la tabla products
        .returning([
            //Una vez que insertes los datos, hazme un retordo de la información ingresada
            "product_id",
            "name",
            "description",
            "price",
            "sku",
            "active",
            "created_at",
        ])
        .then((newProduct) => {
            res.status(201).json(newProduct); //Sí se creo correctamente la mascota, devuelve los datos de la mascota
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json({
                error: "Tuvimos un error, intenta mas tarde",
            }); //Sí se tuvo un error
        });
});

/*-------------------------GET ALL--------------------------------------*/
app.get("/api/AbarroteDonRufino/allproducts", async (req, res) => {
    try {
        const allProducts = await db
            .select("*")
            .from("products")
            .orderBy("product_id", "asc")
            .where("active", true);
        res.status(200).json(allProducts);
    } catch (error) {
        console.log("Tuvimos un error, intenta más tarde");
        res.status(404).json({ error: "Tuvimos un error, intenta más tarde" });
    }
});

/*-------------------------GET ONE PRODUCT BYID--------------------------------------*/
app.get("/api/AbarroteDonRufino/product/:id", async (req, res) => {
    try {
        const idProduct = req.params.id;
        const product = await db
            .select("*")
            .from("products")
            .where({ product_id: idProduct });

        if (product.length == 0) {
            res.status(404).json({ error: "El producto no existe" });
        } else {
            res.status(200).json(product);
        }
    } catch (err) {
        console.log(err);
        res.status(404).json({ err: "Tuvimos un error, intenta más tarde" });
    }
});




/*-------------------------ID y descripción de los productos que cuesten menos de 15 pesos--------------------------------------*/
app.get("/api/AbarroteDonRufino/product", async (req, res) => {
    try {
        const price = req.query.price;
        const product = await db
            .select("*")
            .from("products")
            .where("price", "<", price)
            .orderBy("product_id", "asc");

        res.status(200).json(product);
    } catch (err) {
        console.log(err);
        res.status(404).json({
            err: "Tuvimos un error, intenta más tarde",
        });
    }
});

/*-------------------------CRUD CUSTOMER--------------------------------------*/

/*-------------------------Create New customer--------------------------------------*/
app.post("/api/AbarroteDonRufino/customer", (req, res) => {
    const newCustomer = req.body;

    db.insert(newCustomer)
        .into("customers")
        .returning([
            "customer_id",
            "first_name",
            "last_name",
            "mother_last_name",
            "email",
            "phone",
            "address",
            "city",
            "postal_code",
            "active",
            "created_at",
        ])
        .then((newCustomer) => {
            res.status(201).json(newCustomer);
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json({
                error: "Tuvimos un error, intenta mas tarde",
            });
        });
});

/*-------------------------Read All Customers--------------------------------------*/
app.get("/api/AbarroteDonRufino/customers", async (req, res) => {
    try {
        const allCustomers = await db
            .select("*")
            .from("customers")
            .orderBy("customer_id");

        res.status(200).json(allCustomers);
    } catch (err) {
        console.log(err);
        res.status(404).json({
            err: "Tuvimos un error, intenta más tarde",
        });
    }
});

/*-------------------------Read Customer For City--------------------------------------*/
app.get("/api/AbarroteDonRufino/customers/city", async (req, res) => {
    try {
        const city = req.query.city;
        const customer = await db
            .select("*")
            .from("customers")
            .where("city", city)
            .orderBy("customer_id", "asc");

        res.status(200).json(customer);
    } catch (err) {
        console.log(err);
        res.status(404).json({
            err: "Tuvimos un error, intenta más tarde",
        });
    }
});

/*---------------ID y nombre de cada cliente y la suma total (suma de cantidad) de los productos que ha comprado--------------------*/
app.get('/api/AbarroteDonRufino/sales_customers', async(req, res)=>{
    try {
        const salesCustomer = await db
            .select("first_name")
            .sum("total_price")
            .from("sales")
            .innerJoin('customers','sales.sale_id', 'customer_id');
        res.status(200).json(salesCustomer)
        console.log(salesCustomer);
    } catch (err) {
        console.log(err);
        res.status(404).json({
            err: "Tuvimos un error, intenta más tarde",
        });
    }


})









/*-------------------------Levanta el servidor--------------------------------------*/
const puerto = 3000;
app.listen(puerto, () => {
    console.log(`El servidor ${puerto} se levantó correctamente`); //Codigo se visualiza en la consola de Visual Studio Code
});
