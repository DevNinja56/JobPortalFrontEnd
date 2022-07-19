import React, { useState } from "react";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import CommentInput from "./CommentInput";
import ReplyComments from "./ReplyComments";
import { CommentDocument } from "..";
import CustomTimeAgo from "../../../../../shared/CustomTimeAgo";
import { useSelector } from "react-redux";
import UserProfileModal from "./UserProfileModal";
import FolderZipIcon from '@mui/icons-material/FolderZip';

type SingleCommentProp = CommentDocument & {
  updateState?: any;
};

const SingleComment = ({ comment, createdAt, childId, _id, commentedBy, updateState, media }: SingleCommentProp) => {
  const [isVisibleComment, setIsVisibleComment] = useState<boolean>(false);
  const [hasChild, setHasChild] = useState<boolean>(true);
  const [childComments, setChildComments] = useState<CommentDocument[]>();
  const state: any = useSelector<any>(state => state.UserInfo.userTokken)
  const APIURL = process.env.NODE_ENV === "development" ? "http://localhost:3001" : process.env.REACT_APP_API_URL;

  const addComment = async (dataToAdd: any) => {
    const newFormData = new FormData();
    newFormData.append('media', dataToAdd.media)
    newFormData.append('comment', dataToAdd.comment)
    newFormData.append('commentedBy', dataToAdd.commentedBy)
    newFormData.append('replyToId', _id)
    try {
      const dataSnap = await fetch(`${APIURL}/api/replyToComment`, {
        // Adding method type
        method: "POST",
        // Adding body or contents to send
        body: newFormData
      });

      const { data }: any = await dataSnap.json();
      // setChildComments((prev) => [data.addedComment, ...prev]);
      updateState(data?.addedComment);
    } catch (error) {
      console.log(error);
    }

    setIsVisibleComment(false);
  };
  // show user info modal 
  const [openChangePass, setOpenChangePass] = useState<boolean>(false);
  const ShowUserModal = () => setOpenChangePass(true);
  const HideUserModal = () => setOpenChangePass(false);

  return (
    <>
      <li className={`${hasChild && "has-child"} `}>
        <div className="comment-main-level">
          {/* Avatar */}
          {/* <div className="comment-avatar"><img src="https://picsum.photos/200" alt="" /></div> */}
          {/* Contenedor del Comentario */}
          <div className="comment-box">
            <div className="comment-head">
              <h6 className="comment-name pointer" onClick={ShowUserModal}>{commentedBy?.fullName ? commentedBy?.fullName : state?.fullName}</h6>
              <span>
                <CustomTimeAgo date={createdAt} />
              </span>
              <i className="fa fa-reply" />
              <i className="fa fa-heart" />
              <button
                className="replyButton"
                title="Reply to this Comment"
                onClick={() =>
                  isVisibleComment
                    ? setIsVisibleComment(false)
                    : setIsVisibleComment(true)
                }
              >
                <ReplyAllIcon />
              </button>
            </div>
            <div className="text-and-file-place">
              <div className="comment-content position-relative">{comment}
                <div className="file-dive position-absolute" style={{ top: '8px', right: '8px' }}>{media && <>
                  <a href={`${APIURL}/${media}`} download={true} target='_blank' className="Upload-folder-name bg-success d-inline-flex ml-3">
                    <FolderZipIcon />
                    <span>Download Code</span>
                  </a>
                </>}
                </div>
              </div>
            </div>
            <UserProfileModal openModal={openChangePass} hideModal={HideUserModal} userInfo={commentedBy} />
          </div>
        </div>
        {/* Respuestas de los comentarios */}

        <ul className="comments-list reply-list">
          {childId?.length > 0 &&
            childId?.map((item: CommentDocument, index: number) => {
              // console.log(item);
              return (
                (
                  <ReplyComments {...item} key={index} userName={state?.fullName} />
                )
              )
            })}
        </ul>
      </li>
      {isVisibleComment && (
        <div className="inner-comment mb-3">
          <CommentInput addComment={addComment} />
        </div>
      )}
    </>
  );
};

export default SingleComment;
