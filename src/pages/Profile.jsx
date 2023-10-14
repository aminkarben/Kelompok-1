import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
    const [profile, setProfile] = useState([]);

    useEffect(() => {
        const getProfileDetail = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `${import.meta.env.VITE_VERCEL_AUTH}/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const { data } = response.data;
                setProfile(data);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.log(error?.response?.data?.message);
                    return;
                }
            }
        };
        getProfileDetail();
    }, []);

    return (
        <div className="mt-5 text-white p-3">
            <div>
                <ul>
                    <li>Name : {profile.name}</li>
                    <li>Email : {profile.email}</li>
                </ul>
            </div>
        </div>
    );
};

export default Profile;
