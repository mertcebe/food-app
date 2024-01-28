import EditableImage from "@/components/layout/EditableImage";
import MenuItemPriceProps from "@/components/layout/MenuItemPriceProps";
import { database } from "@/firebase/firebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function MenuItemForm({ onSubmit, menuItem }) {
    const [image, setImage] = useState(menuItem?.img || '');
    const [name, setName] = useState(menuItem?.name || '');
    const [description, setDescription] = useState(menuItem?.description || '');
    const [basePrice, setBasePrice] = useState(menuItem?.price || '');
    const [sizes, setSizes] = useState(menuItem?.sizes || []);
    const [category, setCategory] = useState(menuItem?.category || '');
    const [categories, setCategories] = useState([]);
    const [extraIngredientPrices, setExtraIngredientPrices] = useState(menuItem?.extraIngredientPrices || []);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        let list = [];
        await getDocs(query(collection(database, `categories`)))
            .then((snapshot) => {
                snapshot.forEach(async (category) => {
                    list.push({
                        _id: category.id,
                        ...category.data()
                    });
                })
                setCategories(list)
            })
    }

    return (
        <form
            onSubmit={ev => {
                setLoading(true);
                onSubmit(ev, {
                    img: image, name, description, price: basePrice, sizes, extraIngredientPrices, category,
                });
            }}
            className="mt-8 max-w-2xl mx-auto">
            <div
                className="md:grid items-start gap-4"
                style={{ gridTemplateColumns: '.3fr .7fr' }}>
                <div>
                    <EditableImage link={image.src ? image.src : image} setLink={setImage} />
                </div>
                <div className="grow">
                    <label>Item name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={ev => setName(ev.target.value)}
                    />
                    <label>Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={ev => setDescription(ev.target.value)}
                    />
                    <label>Category</label>
                    <select value={category} onChange={ev => setCategory(ev.target.value)}>
                        {categories?.length > 0 && categories.map(c => (
                            <option key={c._id} value={c.name}>{c.name}</option>
                        ))}
                    </select>
                    <label>Base price</label>
                    <input
                        type="text"
                        value={basePrice}
                        onChange={ev => setBasePrice(ev.target.value)}
                    />
                    <MenuItemPriceProps name={'Sizes'}
                        addLabel={'Add item size'}
                        props={sizes}
                        setProps={setSizes} />
                    <MenuItemPriceProps name={'Extra ingredients'}
                        addLabel={'Add ingredients prices'}
                        props={extraIngredientPrices}
                        setProps={setExtraIngredientPrices} />
                    <button type="submit" disabled={loading}>Save</button>
                </div>
            </div>
        </form>
    );
}