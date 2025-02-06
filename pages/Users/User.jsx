import { useLoaderData } from "react-router-dom";

const User = () => {
    const user = useLoaderData();
    const { address, name, email, website, phone, company } = user || {};

    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
            <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
            <p className="text-gray-600">{email}</p>
            <p className="text-gray-600">{phone}</p>
            <p className="text-blue-600 underline">{website}</p>

            {company && (
                <div className="mt-4">
                    <h3 className="font-semibold text-lg">Company</h3>
                    <p className="text-gray-700">{company.name}</p>
                    <p className="text-gray-500 text-sm">{company.catchPhrase}</p>
                </div>
            )}

            {address && (
                <div className="mt-4">
                    <h3 className="font-semibold text-lg">Address</h3>
                    <p className="text-gray-700">{address.street}, {address.suite}</p>
                    <p className="text-gray-700">{address.city}, {address.zipcode}</p>
                </div>
            )}
        </div>
    );
};

export default User;
