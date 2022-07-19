import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../../layout/DashboardLayout";
import CommentsHistory from "./Comments";
import SingleComment from "./Comments/SingleComment";
import ProfileDetails, { ChallengeTypesSingle } from "./ProfileDetails";
import CommentInput from "./Comments/CommentInput";
import { useDispatch } from "react-redux";
import { changeHeading } from "../../../../../features/HeaderHeading/HeaderHeadingSlice";
import { useParams } from "react-router-dom";
import RightSideOtherChallenges from "./RightSideOtherChallenges";

export type CommentDocument = {
  _id: string;
  comment: string;
  media?: string;
  commentedBy: any[any];
  childId: CommentDocument[];
  replyCount: number;
  challengeId?: string;
  createdAt: number;
  updatedAt: number;
  userName?: string;
};

type Props = {
  comments?: CommentDocument[];
};

const SubmitChallenge = ({ comments = [] }: Props) => {
  const [chellangeData, setChellangeData] = useState<ChallengeTypesSingle>();
  const [loadingComments, setLoadingComments] = useState<boolean>(true);
  const [commentsState, setCommentsState] = useState<CommentDocument[]>(comments);
  const [commentsStateRender, setCommentsStateRender] = useState<CommentDocument>();
  const APIURL = process.env.NODE_ENV === "development" ? "http://localhost:3001" : process.env.REACT_APP_API_URL;
  const { id } = useParams();

  // dispatch update 
  const dispatch = useDispatch();

  // fetch challenge data api 
  const challengeDataApi = async () => {
    try {
      await fetch(`${APIURL}/api/singleChallenge`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          challengeId: id
        })
      })
        .then(res => res.json()).then(data => setChellangeData(data.data))

    } catch (error) {
      console.log(error);
    }
  }
  // fetch comment api 
  const fetchComments = async () => {
    try {
      const commentsSnap = await fetch(`${APIURL}/api/getChallengeComments/${id}`);
      const oldComments = await commentsSnap.json();

      // console.log(oldComments?.data)
      // return false;

      setCommentsState(oldComments.data);
    } catch (error) {
      console.log(error);
    }
    setLoadingComments(false);
  };

  // fetch Add comment API by challenge id 
  const addComment = async (dataToAdd: any) => {
    const formData = new FormData();

    formData.append('media', dataToAdd.media)
    formData.append('comment', dataToAdd.comment)
    formData.append('commentedBy', dataToAdd.commentedBy)

    await fetch(`${APIURL}/api/addComment/${id}`, {
      method: "POST",
      body: formData,
    }).then(res => res.json())
      .then(resData => setCommentsStateRender(resData.data?.addedComment))
  };


  useEffect(() => {
    dispatch(changeHeading('Submit Challenge'));
  }, [])

  useEffect(() => {
    fetchComments();
    challengeDataApi();
  }, [id, commentsStateRender]);

  return (
    <DashboardLayout>
      <>
        <div className="container-fluid text-light mt-3">
          <div className="row">
            <div className="col-lg-9 ">
              <div className="row">
                {chellangeData &&
                  <ProfileDetails {...chellangeData} />
                }
                <div className="col-12 my-3">
                  {/* Contenedor Principal */}
                  <div className="comments-container">
                    <h4 className="text-light">Comments & Feedback :</h4>
                    {/* comment input box start  */}
                    <CommentInput addComment={addComment} />
                    {/* comment input box end */}
                    {!loadingComments && (
                      <CommentsHistory>
                        <>
                          {commentsState?.length > 0 &&
                            commentsState?.map((comment, key) => {
                              return (
                                <SingleComment {...comment} key={key} updateState={setCommentsStateRender} />
                              )
                            })
                          }
                        </>
                      </CommentsHistory>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <RightSideOtherChallenges challengeType={chellangeData?.type} sameChallengeId={chellangeData?._id} />
          </div>
        </div>
      </>
    </DashboardLayout>
  );
};

export default SubmitChallenge;
