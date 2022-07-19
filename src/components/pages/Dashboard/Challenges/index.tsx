import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../../layout/DashboardLayout'
import ChallengeCard from './ChallengeCard'
import { useDispatch } from "react-redux";
import { changeHeading } from "../../../../features/HeaderHeading/HeaderHeadingSlice";

type ChallengesProps = {
    type: string;
}
export type ChallengeTypes = {
    title?: string;
    type?: string;
    level?: string;
    tags?: string[];
    imgSrc?: string;
    _id?: string;
}

const Challenges = ({ type }: ChallengesProps) => {
    const [challengeData, setChallengeData] = useState<ChallengeTypes[]>();
    const APIURL = process.env.NODE_ENV === "development" ? "http://localhost:3001" : process.env.REACT_APP_API_URL;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeHeading(`${type} Challange`));
        fetch(`${APIURL}/api/challenges`)
            .then((snap) => snap.json())
            .then((res) => {
                setChallengeData(res.data);
                // console.log("I got the res here !", res);
            })
            .catch(() => alert("something went wrong"));

        return () => { setChallengeData([]) }
    }, []);


    return (
        <DashboardLayout>
            <>
                {challengeData &&
                    challengeData.filter(filterChallenge => filterChallenge.type === type).map((challenge: ChallengeTypes, key: number) => {
                        return (
                            <ChallengeCard {...challenge} key={key} />
                        )
                    })
                }
            </>
        </DashboardLayout>
    )
}

export default Challenges