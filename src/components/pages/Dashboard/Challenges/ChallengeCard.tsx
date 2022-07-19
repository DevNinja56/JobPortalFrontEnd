import React from 'react'
import { Link } from 'react-router-dom';

export type PropsChallenge = {
    title?: string;
    price?: number;
    level?: string;
    tags?: string[];
    img?: string;
    _id?: string;
    desc?: string;
    type?: string;
}

const ChallengeCard = ({ title, price, level, img, _id, desc = 'challenge__1', tags }: PropsChallenge) => {
    return (
        <Link to={`/challenge/submit/${_id}`}>
            <div className="challenge-card py-3 text-light">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        {/* <div className="col-md-2 col-6 offset-3 offset-md-0">
                            <img src={img} alt="task_logo" className='card-logo' draggable={false} />
                        </div> */}
                        <div className=" col-md-10 mt-4 mt-md-0">
                            <div className="tags d-flex ">
                                {tags?.map((tag, key) =>
                                    <div className="tag" key={key}>{tag}</div>
                                )}
                            </div>
                            <h2 className="challenger-title text-light text-capitalize">{title}</h2>
                            {/* <p className="text-light">{desc}</p> */}
                        </div>
                        <div className="col-md-2 text-md-center text-right">
                            <div className="price-container  d-inline-block">
                                {price &&
                                    <h3 className="price">$ <b> {price}</b></h3>
                                }
                                {level &&
                                    <h4 className="text-bold">Level : <b className='text-capitalize text-danger2'>{level}</b></h4>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ChallengeCard