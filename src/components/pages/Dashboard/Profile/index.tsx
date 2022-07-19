import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../../layout/DashboardLayout'
import { TextField, Box, Modal, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Cookies from "js-cookie";
import toast from 'react-hot-toast';
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { changeHeading } from '../../../../features/HeaderHeading/HeaderHeadingSlice';

type userProfile = {
    fullName: string;
    email: string;
    password: string;
    enabled: boolean;
    stripePass: string;
    avatarImg: string;
    about: string;
    profession: string;
    phone: string;
    linkedIn: string;
    portFolio: string;
    createdAt: string;
    updatedAt: string;
    passwordUpdatedAt: string;
};

const Profile = () => {
    const [userProfile, setUserProfile] = useState<userProfile>();
    const [loading, setLoading] = useState<boolean>(true);
    const [open, setOpen] = React.useState(false);
    const [openChangePass, setOpenChangePass] = React.useState(false);
    const navigate = useNavigate();

    // dispatch redux 
    const dispatch = useDispatch();


    // get auth tokken from cookie 
    const cookieKey = process.env.REACT_APP_AUTH_COOKIE;
    const authTokken = Cookie.get(cookieKey || "nothing");

    const APIURL = process.env.NODE_ENV === "development" ? "http://localhost:3001" : process.env.REACT_APP_API_URL;

    const fetchUserProfile = async () => {
        const cookieKey = process.env.REACT_APP_AUTH_COOKIE;
        const APIURL = process.env.NODE_ENV === "development" ? "http://localhost:3001" : process.env.REACT_APP_API_URL;
        const authTokken = Cookies.get(cookieKey || "nothing");

        const dataSnap = await fetch(`${APIURL}/api/getProfile`, {
            // Adding method type
            method: "POST",
            // Adding body or contents to send
            body: JSON.stringify({
                authTokken,
            }),
            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });

        const { data } = await dataSnap.json();

        setUserProfile(data);
        setLoading(false);
    };
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenChangePass = () => setOpenChangePass(true);
    const handleCloseChangePass = () => setOpenChangePass(false);

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const handleSubmitUpdateProfile = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // fetch api for update user details 
        fetch(`${APIURL}/api/updateUser`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                authTokken: authTokken,
                email: userProfile?.email,
                updates: {
                    about: data.get('about') || userProfile?.about,
                    fullName: data.get('f_name') || userProfile?.fullName,
                    linkedIn: data.get('linkedIn') || userProfile?.linkedIn,
                    phone: data.get('phone') || userProfile?.phone,
                    portFolio: data.get('portFolio') || userProfile?.portFolio,
                    profession: data.get('profession') || userProfile?.profession,
                }
            })
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data?.error) {
                    toast.error(data?.error);
                }
                if (data?.data) {
                    toast.success("Update Profile");
                    navigate("/home");
                }
                console.log(data);
            })
            .catch((err) => console.log(err))
    }
    const handleSubmitUpdatePassword = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let password = data?.get("new_password");
        let passwordLength: any = password?.toString().length
        if (data.get("new_password") !== data.get("c_new_password") || passwordLength < 8 || !data.get("password")) {
            toast.error('please fill all the fileds and new password is min 8 digit')
        } else {
            fetch(`${APIURL}/api/changePassword`, {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    authTokken: authTokken,
                    oldPassword: data.get("password"),
                    newPassword: data.get("new_password")
                }),
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    if (data?.error) {
                        toast.error(data?.error);
                    }
                    if (data?.message) {
                        toast.success(data?.message);
                        navigate("/home");
                    }
                    console.log(data);
                })
                .catch((err) => console.log(err))
        }
    }

    useEffect(() => {
        dispatch(changeHeading('Profile'));
        fetchUserProfile();
    }, []);

    return (
        <DashboardLayout>
            {!loading ? (
                <section className="profile-section about-section gray-bg position-relative">
                    <div className="container-fluid">
                        <div className="row align-items-center ">
                            {userProfile && (
                                <div className="col-md-9">
                                    <div className="about-text go-to">
                                        <h3 className="text-light profile-text">
                                            {userProfile?.fullName}
                                        </h3>
                                        <h6 className="lead text-light">
                                            {userProfile?.profession}
                                        </h6>
                                        <p className="text-light">{userProfile?.about}</p>
                                        <div className="row about-list w-100 pl-3">
                                            <div className="media col-md-6">
                                                <label>Email</label>
                                                <p>{userProfile?.email}</p>
                                            </div>
                                            <div className="media col-md-6">
                                                <label>Phone #</label>
                                                <p>{userProfile?.phone}</p>
                                            </div>
                                            <div className="media col-md-6">
                                                <label>Linked In</label>
                                                <p style={{
                                                    maxWidth: "calc(100% - 120px)",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                    display: "inline-block"
                                                }}>
                                                    <a href={`https://${userProfile?.linkedIn}`}
                                                        className='text-light' target='_blank'
                                                    >{userProfile?.linkedIn}</a>
                                                </p>
                                            </div>
                                            <div className="media col-md-6">
                                                <label>Portfolio</label>
                                                <p style={{
                                                    maxWidth: "calc(100% - 120px)",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                    display: "inline-block"
                                                }}>
                                                    <a href={`https://${userProfile?.portFolio}`}
                                                        className='text-light' target='_blank'
                                                    >{userProfile?.portFolio}</a>
                                                </p>
                                            </div>
                                            <div className="media col-md-6">
                                                <label>Password</label>
                                                <p className='d-flex align-items-center'>
                                                    <span className="mr-1 d-inline-block">********</span>
                                                    <Button onClick={handleOpenChangePass} className='user-edit-info text-danger'>Change <EditIcon /></Button>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* user details edit info  */}
                            <div className="userEdit-info">
                                <Button onClick={handleOpen} className='user-edit-info'>Update Info <EditIcon /></Button>
                                {/* update user info modal  */}
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style} component="form" onSubmit={handleSubmitUpdateProfile}>
                                        <h3 className="text-dark text-center">Update User Info</h3>
                                        <TextField
                                            label="Full Name"
                                            placeholder="Full Name"
                                            size="small"
                                            className='my-2 w-100'
                                            defaultValue={userProfile?.fullName}
                                            name='f_name'

                                        />
                                        <TextField
                                            label="Profession"
                                            placeholder="Profession"
                                            size="small"
                                            className='my-2 w-100'
                                            defaultValue={userProfile?.profession}
                                            name='profession'

                                        />
                                        {/* <TextField
                                            id="outlined-textarea"
                                            label="Email Address "
                                            placeholder="Email Address"
                                            size="small"
                                            className='my-2 w-100'
                                            defaultValue={userProfile?.email}
                                        /> */}
                                        <TextField
                                            label="Phone Number "
                                            placeholder="Phone Number"
                                            size="small"
                                            className='my-2 w-100'
                                            defaultValue={userProfile?.phone}
                                            name='phone'
                                            type='tel'
                                        />
                                        <TextField
                                            label="Linked In "
                                            placeholder="Linked In"
                                            size="small"
                                            className='my-2 w-100'
                                            defaultValue={userProfile?.linkedIn}
                                            name='linkedIn'
                                            type='url'
                                        />
                                        <TextField
                                            label="Portfolio "
                                            placeholder="Portfolio"
                                            size="small"
                                            className='my-2 w-100'
                                            defaultValue={userProfile?.portFolio}
                                            name='portFolio'
                                            type='url'
                                        />
                                        <TextField
                                            id="outlined-multiline-static"
                                            label="About me"
                                            placeholder='Write something about me!'
                                            multiline
                                            rows={3}
                                            className='my-2 w-100'
                                            defaultValue={userProfile?.about}
                                            name='about'
                                        />
                                        <button type="submit" className="btn-own w-100">Update User</button>
                                    </Box>
                                </Modal>
                                {/* change password modal  */}
                                <Modal
                                    open={openChangePass}
                                    onClose={handleCloseChangePass}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style} component="form" onSubmit={handleSubmitUpdatePassword}>
                                        <h3 className="text-dark text-center">Update User Info</h3>
                                        <TextField
                                            id="outlined-textarea"
                                            label="Current Password"
                                            placeholder="Current Password"
                                            type="password"
                                            size="small"
                                            className='my-2 w-100'
                                            name='password'
                                        />
                                        <TextField
                                            id="outlined-textarea"
                                            label="New Password"
                                            placeholder="New Password"
                                            type="password"
                                            size="small"
                                            className='my-2 w-100'
                                            name='new_password'
                                        />
                                        <TextField
                                            id="outlined-textarea"
                                            label="Confirm New Password"
                                            placeholder="Confirm New Password"
                                            type="password"
                                            size="small"
                                            className='my-2 w-100'
                                            name='c_new_password'
                                        />
                                        <button type="submit" className="btn-own w-100">Update User</button>
                                    </Box>
                                </Modal>
                            </div>
                        </div>
                        {/* edit fourm all  */}
                        {/* <div className="update_fourm_data">
                            <Grid >
                                <Box component="form">
                                    <TextField id="outlined-basic" label="Email Address" variant="filled" fullWidth />
                                </Box>
                            </Grid>
                        </div> */}
                    </div>
                </section>
            ) : (
                <h2 className='text-light text-center'>Loading ! ...</h2>
            )}
        </DashboardLayout>
    );
};

export default Profile;
