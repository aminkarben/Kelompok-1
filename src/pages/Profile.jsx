import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../redux/actions/profileAction";

const Profile = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile.users);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    return (
        <div
            className=" d-flex text-white justify-content-center align-items-center"
            style={{ minHeight: "80vh", marginTop: "5rem" }}
        >
            <div className="container-fluid mx-5 rounded p-5 bg-dark">
                <div className="opacity-75 text-white fs-1 fw-semibold">
                    <div className="text-center text-white">My Profile</div>
                </div>
                <center>
                    <div
                        className="mt-4 card center "
                        style={{ width: "7rem", borderRadius: "50%" }}
                    >
                        <img
                            className="poto_kosong"
                            src="/poto_kosong.png"
                            alt="poto_kosong"
                        />
                    </div>
                </center>

                <div className="d-flex flex-column gap-4 mt-5">
                    <div>
                        <p className="m-0 fs-5">Name </p>
                        <div className="bg-white card text-black text-center">
                            <div className="card-body opacity-75 fw-semibold fs-5">
                                {profile.name}
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className="m-0 fs-5">Email</p>
                        <div className="bg-white card text-black text-center">
                            <div className="card-body opacity-75 fw-semibold fs-5">
                                {profile.email}
                            </div>
                        </div>
                    </div>

                    <Button variant="danger">Edit Profile</Button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
