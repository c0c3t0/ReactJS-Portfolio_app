export const Comments = ({ photo }) => {
    return (
        <div className="comments">
            <div className="comment">
                <ul type='none'>
                    {photo.comments && photo.comments
                        .sort((a, b) => a._createdOn < b._createdOn ? 1 : -1)
                        .map(comment => (
                            <li key={comment._id} className="comment">
                                <p>{comment.author.email} says:</p>
                                <p>"{comment.comment}"</p>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    )
}