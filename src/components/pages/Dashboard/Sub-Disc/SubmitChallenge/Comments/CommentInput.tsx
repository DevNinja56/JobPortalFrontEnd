import React, { useState } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import CommentIcon from '@mui/icons-material/Comment';
import { useSelector } from "react-redux";

type Props = {
  addComment: Function;
};

const CommentInput = ({ addComment = () => { } }: Props) => {
  const [comment, setComment] = useState<string>();
  const [isUpload, setIsUplaod] = useState<string>();
  const [mediaFile, setMediaFile] = useState<File>();
  const state: any = useSelector<any>(state => state.UserInfo.userTokken)
  // console.log(state.id);

  const handleChange = (e: any) => {
    var files = e.target.files;
    setIsUplaod(files[0]?.name);
    setMediaFile(files[0]);
  };
  const randomId = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(0, 5);

  return (
    <div className="input-comment-and-attach-file mt-3">
      <div className="d-flex"><CommentIcon /> <h6 className="text-dark ml-3">Add a comment</h6></div>
      <form className="position-relative" encType="multipart/form-data">
        <div className="input-container-with-btn ">
          <textarea
            name="msgBox"
            id=""
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write Comment or Upload file"
          ></textarea>
          <div className="btn-box d-flex align-items-center flex-wrap">
            <div className="d-flex position-relative mt-3">
              <small
                style={{ position: 'absolute', top: "-30px", color: 'red', whiteSpace: 'nowrap', fontWeight: '500' }}
              >
                * Please Upload Only Zip & PNG/JPEG File.
              </small>
              <label htmlFor={randomId}>
                <UploadFileIcon /> <span className='d-none d-md-inline-block'>Upload File</span>
              </label>
              <input
                type="file" id={randomId} style={{ display: "none" }} onChange={(e) => handleChange(e)} name='media'
                accept='.zip , .png , .jpeg' />
              {/* attach file  div show */}
              {isUpload && (
                <div className="Upload-folder-name bg-success d-inline-flex ml-3">
                  <FolderZipIcon />
                  <span title={isUpload}>{isUpload}</span>
                </div>
              )}
            </div>
            <button name="fileName" type="submit" className="btn-own-input mt-3"
              onClick={(e) => {
                e.preventDefault();
                if (comment && comment?.length <= 1) return false;
                addComment({ comment: comment, commentedBy: state?.id, media: mediaFile });
                setComment('')
                setIsUplaod('')
              }}
            >Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentInput;
