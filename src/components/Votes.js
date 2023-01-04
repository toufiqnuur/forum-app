import { IoThumbsDownOutline, IoThumbsUpOutline } from 'react-icons/io5';

export default function Votes({ like, dislike, isLiked, isDisliked, onLike, onDislike }) {
  return (
    <div className="inline-flex space-x-3">
      <button className="inline-flex space-x-1" onClick={onLike} data-testid="like-button">
        <IoThumbsUpOutline className={`${isLiked && 'text-blue-600'}`} /> <span>{like}</span>
      </button>
      <button className="inline-flex space-x-1" onClick={onDislike} data-testid="dislike-button">
        <IoThumbsDownOutline className={`${isDisliked && 'text-red-600'}`} /> <span>{dislike}</span>
      </button>
    </div>
  );
}
