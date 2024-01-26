'use client';
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/useProfile";
import { database } from "@/firebase/firebaseConfig";
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, setDoc, updateDoc } from "firebase/firestore";
import DeleteButton from "@/components/DeleteButton";
import { useEffect, useState } from "react";

export default function CategoriesPage() {
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState([]);
    const { loading: profileLoading, data: profileData } = useProfile();
    const [editedCategory, setEditedCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        getDocs(query(collection(database, `categories`), orderBy('name', 'desc')))
            .then((snapshot) => {
                let list = [];
                snapshot.forEach((category) => {
                    list.push({
                        _id: category.id,
                        ...category.data()
                    });
                })
                setCategories(list);
            })
    }

    async function handleCategorySubmit(e) {
        e.preventDefault();
        if (!editedCategory) {
            await addDoc(collection(database, `categories`), {
                name: categoryName
            });
        }
        else {
            await updateDoc(doc(database, `categories/${editedCategory._id}`), {
                name: categoryName
            });
        }
        setCategoryName('');
        fetchCategories();
        setEditedCategory(null);
    }

    async function handleDeleteClick(_id) {
        deleteDoc(doc(database, `categories/${_id}`))
            .then(() => {
                fetchCategories();
            })
    }

    if (profileLoading) {
        return 'Loading user info...';
    }

    // if (!profileData.admin) {
    //     return 'Not an admin';
    // }

    return (
        <section className="mt-8 max-w-2xl mx-auto">
            <UserTabs isAdmin={true} />
            <form className="mt-8" onSubmit={handleCategorySubmit}>
                <div className="flex gap-2 items-end">
                    <div className="grow">
                        <label>
                            {editedCategory ? 'Update category' : 'New category name'}
                            {editedCategory && (
                                <>: <b>{editedCategory.name}</b></>
                            )}
                        </label>
                        <input type="text"
                            value={categoryName}
                            onChange={ev => setCategoryName(ev.target.value)}
                        />
                    </div>
                    <div className="pb-2 flex gap-2">
                        <button className="border border-primary" type="submit">
                            {editedCategory ? 'Update' : 'Create'}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setEditedCategory(null);
                                setCategoryName('');
                            }}>
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
            <div>
                <h2 className="mt-8 text-sm text-gray-500">Existing categories</h2>
                {categories?.length > 0 && categories.map(c => (
                    <div
                        key={c._id}
                        className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center">
                        <div className="grow">
                            {c.name}
                        </div>
                        <div className="flex gap-1">
                            <button type="button"
                                onClick={() => {
                                    setEditedCategory(c);
                                    setCategoryName(c.name);
                                }}
                            >
                                Edit
                            </button>
                            <DeleteButton
                                label="Delete"
                                onDelete={() => handleDeleteClick(c._id)} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}