var contentNode = document.getElementById('contents');

const products = [
    {
        id : '1',
        name : 'blue shirt',
        price : '17',
        category : 'shirts',
        image : 'view'
    }
];



class ProductRow extends React.Component{
    render() {return(
            <tr>
                <td>{this.props.product.name}</td>
                <td>{this.props.product.price}</td>
                <td>{this.props.product.category}</td>
                <td><a href="#" onclick="window.open({this.props.product.image}); return false;" >View</a> </td>
            </tr>
    )};
}

class ProductTable extends React.Component{
    constructor(props) {
        super(props);

    }
    render() {
        const productRows = this.props.products.map(product => <ProductRow key={product.id} product={product}/>)
        return(
            <table className="bordered-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Image</th>
                    </tr>
                </thead>
            <tbody>{productRows}</tbody>
            </table>
    );
    }
}

class ProductAdd extends React.Component{
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        var form = document.forms.addProduct;
        this.props.createProduct({
            name : form.name.value,
            price : form.price.value,
            category : form.category.value,
            image : form.image.value,

        });
        form.name.value = "";
        form.price.value="";
        form.category.value="";
        form.image.value="";
    }

    render() {
        return(
            <div>
                <form name="addProduct" onSubmit={this.handleSubmit}>
                    <table className="form-table">
                        <tr>
                            <td>
                                Name<br/>
                                <input type="text" name="name" placeholder="Name"/>
                            </td>
                            <td>
                                Price<br/>
                                <input type="text" name="price" placeholder="Price"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Category <br/>
                                <select name="category"> 
                                    <option value="shirts">Shirts</option>
                                    <option value="jeans">Jeans</option>
                                    <option value="jackets">Jackets</option>
                                    <option value="sweaters">Sweaters</option>
                                    <option value="accessories">Accessories</option>
                                </select>
                            </td>
                            <td>
                                Image URL<br/>
                                <input type="text" name="image" placeholder="Image"/>
                            </td>
                        </tr>
                    </table>
                    <button>Add Product</button>
                </form>
            </div>
        );
    }
}


class ProductList extends React.Component{
    constructor() {
        super();
        this.state = {products : products};
        this.createProduct = this.createProduct.bind(this);
    }

    createProduct(newProduct) {
        const newProducts = this.state.products.slice();
        newProduct.id = newProducts.length + 1;
        newProducts.push(newProduct);
        this.setState({products : newProducts});
    }

    render() {
        return(
            <div>
                <h1>My Company MyInventory</h1>
                Showing all available products
                <hr/>
                <ProductTable products={this.state.products}/>
                <hr/>
                Add a new product to inventory
                <hr/>
                <ProductAdd createProduct={this.createProduct}/>
            </div>
        );
    }
}




ReactDOM.render(<ProductList/>, contentNode);