const { useState, useEffect } = React;

const CategoryItem = ({ name }) => ( <
    div className = "category-item" > { name } < /div>
);

const App = () => {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const itemsPerPage = 100;

    useEffect(() => {
        const loadCategories = () => {
            const newCategories = [];
            for (let i = (page - 1) * itemsPerPage; i < page * itemsPerPage; i++) {
                newCategories.push(`Category ${i + 1}`);
            }
            setCategories(prevCategories => [...prevCategories, ...newCategories]);
        };
        loadCategories();
    }, [page]);

    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
            setPage(prevPage => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredCategories = categories.filter(category =>
        category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return ( <
        >
        <
        input type = "text"
        id = "search-input"
        placeholder = "Search categories..."
        onChange = { handleSearch }
        value = { searchTerm }
        /> <
        div id = "category-container" > {
            filteredCategories.map((category, index) => ( <
                CategoryItem key = { index }
                name = { category }
                />
            ))
        } <
        /div> <
        />
    );
};

ReactDOM.render( < App / > , document.getElementById('category-container'));