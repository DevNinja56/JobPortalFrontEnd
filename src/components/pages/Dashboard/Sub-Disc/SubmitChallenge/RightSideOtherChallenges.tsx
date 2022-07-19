import React, { useEffect, useState } from 'react'
import { ChallengeTypes } from '../../Challenges';
import ChallengeCardOther from '../../Challenges/ChallengeCardOther';

type otherChallengeCardProps = {
    challengeType?: string;
    sameChallengeId?: string;
}

const RightSideOtherChallenges = ({ challengeType, sameChallengeId }: otherChallengeCardProps) => {
    const [otherChallenge, setOtherChallenge] = useState<ChallengeTypes[]>();
    const APIURL = process.env.NODE_ENV === "development" ? "http://localhost:3001" : process.env.REACT_APP_API_URL;

    useEffect(() => {
        // other challenges api fetch 
        fetch(`${APIURL}/api/challenges`)
            .then((snap) => snap.json())
            .then((res) => {
                setOtherChallenge(res.data);
                // console.log("I got the res here !", res);
            })
            .catch(() => alert("something went wrong"));
    }, [])
    return (
        <>
            <div className={`col-lg-3 text-center overflow-auto h-100`}>
                <h4 className="text-light">Other Challenges</h4>
                <div className="row d-lg-block d-flex">
                    {otherChallenge && otherChallenge?.filter(filterChallenge => filterChallenge.type === challengeType).map((item, key) => <ChallengeCardOther {...item} key={key} removeItem={item._id == sameChallengeId ? 'd-none' : ''} />)}
                </div>
            </div>
        </>
    )
}

export default RightSideOtherChallenges