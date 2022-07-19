import React, { useState } from "react";
import { CommentDocument } from "..";
import CustomTimeAgo from "../../../../../shared/CustomTimeAgo";
import UserProfileModal from "./UserProfileModal";
import FolderZipIcon from '@mui/icons-material/FolderZip';

export type ReplyCommentProp = CommentDocument & {};

const ReplyComments = ({ comment, createdAt, commentedBy, userName, media }: ReplyCommentProp) => {
  const APIURL = process.env.NODE_ENV === "development" ? "http://localhost:3001" : process.env.REACT_APP_API_URL;
  // console.log(commentedBy?.fullName)

  // show user info modal 
  const [openChangePass, setOpenChangePass] = useState<boolean>(false);
  const ShowUserModal = () => setOpenChangePass(true);
  const HideUserModal = () => setOpenChangePass(false);
  return (
    <>
      <li>
        {/* Avatar */}
        {/* <div className="comment-avatar"><img src="https://picsum.photos/200" alt="" /></div> */}
        {/* Contenedor del Comentario */}
        <div className="comment-box">
          <div className="comment-head">
            <h6 className="comment-name pointer" onClick={ShowUserModal}>{commentedBy?.fullName ? commentedBy?.fullName : userName}</h6>
            <span>
              <CustomTimeAgo date={createdAt} />
            </span>
            <i className="fa fa-reply" />
            <i className="fa fa-heart" />
          </div>
          <div className="comment-content position-relative">{comment}
            <div className="file-dive position-absolute" style={{ top: '8px', right: '8px' }}>{media && <>
              <a href={`${APIURL}/${media}`} download={true} target='_blank' className="Upload-folder-name bg-success d-inline-flex ml-3">
                <FolderZipIcon />
                <span>Download Code</span>
              </a>
            </>}
            </div>
          </div>
          <UserProfileModal openModal={openChangePass} hideModal={HideUserModal} userInfo={commentedBy} />
        </div>
      </li>
    </>
  );
};

export default ReplyComments;
