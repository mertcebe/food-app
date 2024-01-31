import Image from "next/image";
import Trash from "../icons/Trash";
import Link from "next/link";

export default function CartProduct({ product, onRemove, disabled }) {
    return (
        <div className="flex items-center gap-4 border-b py-4">
            <div className="w-24">
                <Image width={240} height={240} src={product.productInfo.img} alt={''} />
            </div>
            <div className="grow">
                <h3 className="font-semibold capitalize">
                    {product.productInfo.name}
                </h3>
                {product.sizes && (
                    <div className="text-sm">
                        <span className="font-bold text-gray-600">Size:</span> <span>{product.sizes.name}</span>
                    </div>
                )}
                {product.extras?.length > 0 && (
                    <div className="text-sm text-gray-500">
                        {product.extras.map(extra => (
                            <div key={extra.name}>{extra.name} ${extra.price}</div>
                        ))}
                    </div>
                )}
            </div>
            <div className="text-lg font-semibold">
                ${product.price}
            </div>
            <div className="ml-2">
                <button
                    type="button"
                    onClick={() => onRemove(product.id)}
                    className="p-2"
                    disabled={disabled}
                    >
                    <Trash />
                </button>
            </div>
        </div>
    );
}