import React, { useState } from 'react'
// import FolderZipIcon from '@mui/icons-material/FolderZip';
// import UploadFileIcon from '@mui/icons-material/UploadFile';

export type ChallengeTypesSingle = {
    title: string;
    img: string;
    price?: number;
    level?: string;
    technologyStack?: string[];
    type: string;
    desc: string;
    _id?: string;
}
const ProfileDetails = ({ img, title, type, price, level, technologyStack, desc }: ChallengeTypesSingle) => {

    let newLineText = desc.slice(desc.indexOf("Deadline"), desc.length);
    let newDesc = desc.replace(newLineText, '');


    return (
        <>
            <div className="row w-100">
                {/* <div className="col-3">
                    <img src={img} className='w-100 rounded shadow-lg' alt="Challenge-pic" />
                </div> */}
                <div className="col-12">
                    <div className="row">
                        <div className="col-md-9">
                            <h1 className='Challenge-title'>{title}</h1>
                        </div>
                        <div className="col-md-3">
                            {price &&
                                <h3 className="Price text-right">Price : <span className="text-danger2">${price}</span></h3>
                            }
                            {level &&
                                <h3 className="level text-right text-capitalize ">Level : <span className="text-danger2">{level}</span></h3>
                            }
                        </div>
                    </div>
                    <p className="desc mb-0">{newDesc}</p>
                    <p className="desc text-danger">{newLineText}</p>
                    <div className="date">
                        <p className="float-right challenge-type">Challenge Type : <span className="text-capitalize text-danger2">{type}</span></p>
                    </div>
                    {/* <div className="tags d-flex">
                        {technologyStack &&
                            technologyStack.map((tag, key) => <div className="tag" key={key}>{tag}</div>)
                        }
                    </div> */}

                    {/* {isUpload &&
                        <div className="Upload-folder-name bg-success d-inline-flex "><FolderZipIcon />{isUpload}</div>
                    } */}
                    {/* <div className="upload-project">
                        <label htmlFor="uploadDoc" className='btn-own float-right'><UploadFileIcon /> Upload Project</label>
                        <input type="file" name="upload-doc" id="uploadDoc"
                            accept=".zip,.rar,.7zip" className='d-none'
                            onChange={e => handleChange(e)} />
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default ProfileDetails