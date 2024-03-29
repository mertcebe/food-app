'use client';
import AddressInputs from "@/components/layout/AddressInputs";
import { useState } from "react";
import EditableImage from "./EditableImage";
import { useProfile } from "../useProfile";
import { ImageApload } from "@/files/ImageApload";

export default function UserForm({ user, onSave }) {
    const [userName, setUserName] = useState(user?.displayName || '');
    const [image, setImage] = useState(user?.image || '');
    const [phone, setPhone] = useState(user?.phoneNumber || '');
    const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
    const [postalCode, setPostalCode] = useState(user?.postalCode || '');
    const [city, setCity] = useState(user?.city || '');
    const [country, setCountry] = useState(user?.country || '');
    const [admin, setAdmin] = useState(user?.admin || false);
    const { data: loggedInUserData } = useProfile();

    function handleAddressChange(propName, value) {
        if (propName === 'phone') setPhone(value);
        if (propName === 'streetAddress') setStreetAddress(value);
        if (propName === 'postalCode') setPostalCode(value);
        if (propName === 'city') setCity(value);
        if (propName === 'country') setCountry(value);
    }

    return (
        <div className="md:flex gap-4">
            <div>
                <div className="p-2 rounded-lg relative max-w-[120px]">
                    <EditableImage link={image.src} setLink={setImage} />
                </div>
            </div>
            <form
                className="grow"
                onSubmit={e => {
                    e.preventDefault();
                    ImageApload(image.file)
                        .then((snapshot) => {
                            if (snapshot !== '') {
                                onSave(e, {
                                    displayName: userName, image: snapshot, photoURL: snapshot.src, phoneNumber: phone, admin,
                                    streetAddress, city, country, postalCode,
                                })
                            }
                            else {
                                onSave(e, {
                                    displayName: userName, phoneNumber: phone, admin,
                                    streetAddress, city, country, postalCode,
                                })
                            }
                        })
                }
                }
            >
                <label>
                    First and last name
                </label>
                <input
                    type="text" placeholder="First and last name"
                    value={userName} onChange={e => setUserName(e.target.value)}
                />
                <label>Email</label>
                <input
                    type="email"
                    disabled={true}
                    value={user.email}
                    placeholder={'email'}
                />
                <AddressInputs
                    addressProps={{ phone, streetAddress, postalCode, city, country }}
                    setAddressProp={handleAddressChange}
                />
                {loggedInUserData.admin && (
                    <div>
                        <label className="p-2 inline-flex items-center gap-2 mb-2" htmlFor="adminCb">
                            <input
                                id="adminCb" type="checkbox" className="" value={'1'}
                                checked={admin}
                                onChange={ev => setAdmin(ev.target.checked)}
                            />
                            <span>Admin</span>
                        </label>
                    </div>
                )}
                <button type="submit">Save</button>
            </form>
        </div>
    );
}