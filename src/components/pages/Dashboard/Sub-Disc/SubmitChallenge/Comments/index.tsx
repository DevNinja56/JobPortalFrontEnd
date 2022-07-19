import React from 'react'

type Props = {
    children?: React.ReactElement;
}

const CommentsHistory = ({ children }: Props) => {
    return (<>
        <ul className="comments-list list-unstyled">
            <>{children}</>
        </ul>
    </>
    )
}

export default CommentsHistory