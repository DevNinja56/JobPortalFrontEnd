import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';
import { PropsChallenge } from './ChallengeCard';

type OtherCardType = PropsChallenge & {
    removeItem?: string ;
}
export default function ChallengeCardOther({ title, type, price, level, desc, _id, removeItem }: OtherCardType) {
    return (
        <Link to={`/challenge/submit/${_id}`} className={removeItem}>
            <Card sx={{ maxWidth: 345, textAlign: 'left', margin: '20px 10px' }}>
                <CardActionArea>
                    {/* <CardMedia
                    component="img"
                    height="140"
                    image="https://picsum.photos/600/600"
                    alt="green iguana"
                /> */}
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {desc}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className='d-flex justify-content-between'>
                    <Typography >Type : <span className="text-danger2 text-capitalize">{type}</span></Typography>
                    {level &&
                        <Typography >Level : <span className="text-danger2 text-bold text-capitalize">{level}</span></Typography>
                    }
                    {price &&
                        <Typography >Price : <span className="text-danger2 text-bold">${price}</span></Typography>
                    }
                </CardActions>
            </Card>
        </Link>
    );
}
