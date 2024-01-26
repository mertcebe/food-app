import { ImageApload } from "@/files/ImageApload";
import Image from "next/image";

export default function EditableImage({ link, setLink }) {
    async function handleFileChange(e) {
        const files = e.target.files;
        const src = URL.createObjectURL(files[0]);
        setLink({ src, file: files[0] });
    }

    return (
        <>
            {link ?
                <Image className="rounded-lg w-full h-full mb-1" src={link} width={250} height={250} alt={'avatar'} />
                :
                <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
                    No image
                </div>

            }
            <label>
                <input type="file" className="hidden" onChange={handleFileChange} />
                <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">Change image</span>
            </label>
        </>
    );
}