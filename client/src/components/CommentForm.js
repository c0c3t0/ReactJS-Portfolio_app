import { useForm } from "../hooks/useForm";

export const CommentForm = ({
    onCommentSubmit,
}) => {
    const { values, changeHandler, onSubmit } = useForm({
        comment: ''
    }, onCommentSubmit);

    return (
        <article className="create-comment">
            <form className="form" onSubmit={onSubmit}>
                <textarea className="textarea-comments" rows={3} name="comment" placeholder="Type Your Comment" value={values.comment} onChange={changeHandler}></textarea>
                <button className="button green">Add</button>
            </form>
        </article>
    );
};