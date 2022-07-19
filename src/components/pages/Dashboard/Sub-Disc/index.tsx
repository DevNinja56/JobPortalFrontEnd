import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { changeHeading } from '../../../../features/HeaderHeading/HeaderHeadingSlice'
import DashboardLayout from '../../../layout/DashboardLayout'
import { ChallengeTypes } from '../Challenges'
import ChallengeCard from '../Challenges/ChallengeCard'

type Props = {}

const SubDec = (props: Props) => {
    const [challengeData, setChallengeData] = useState<ChallengeTypes[]>();
    const APIURL = process.env.NODE_ENV === "development" ? "http://localhost:3001" : process.env.REACT_APP_API_URL;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeHeading('Submissions / Discussions'));
        fetch(`${APIURL}/api/challenges`)
            .then((snap) => snap.json())
            .then((res) => {
                setChallengeData(res.data);
                // console.log("I got the res here !", res);
            })
            .catch(() => alert("something went wrong"));
    }, []);


    return (
        <DashboardLayout>
            <>
                {/* <h1 className="text-center text-light">Submissions / Discussions</h1> */}
                <p className="text-light">Practice Challenges</p>
                {challengeData &&
                    challengeData?.filter(filterChallenge => filterChallenge.type === 'practice').map((item, key) =>
                        <ChallengeCard {...item} key={key} />
                    )}
                <p className="text-light">Cash Challenges</p>
                {challengeData &&
                    challengeData?.filter(filterChallenge => filterChallenge.type === 'cash').map((item, key) =>
                        <ChallengeCard {...item} key={key} />
                    )}
            </>
        </DashboardLayout>
    )
}

export default SubDec