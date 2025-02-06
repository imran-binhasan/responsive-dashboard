import { useLoaderData } from "react-router-dom";

const User = () => {
    const user = useLoaderData();
    const { address, name, email, website, phone, company } = user || {};

    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">{name || "Unknown User"}</h2>
            <p className="text-gray-600">{email || "No email available"}</p>
            <p className="text-gray-600">{phone || "No phone available"}</p>
            {website && (
                <a href={`https://${website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline break-all">
                    {website}
                </a>
            )}

            {company && (
                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg">🏢 Company</h3>
                    <p className="text-gray-700">{company.name}</p>
                    <p className="text-gray-500 text-sm italic">"{company.catchPhrase}"</p>
                </div>
            )}

            {address && (
                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg">📍 Address</h3>
                    <p className="text-gray-700">{address.street}, {address.suite}</p>
                    <p className="text-gray-700">{address.city}, {address.zipcode}</p>
                </div>
            )}
        </div>
    );
};

export default User;
