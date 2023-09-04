import './index.css'

const StoryItem = props => {
  const {storyItem} = props
  const {userName, storyUrl, userId} = storyItem
  return (
    <div className="story" key={userId}>
      <img src={storyUrl} alt="user story" className="story-image" />
      <p className="story-text">{userName}</p>
    </div>
  )
}

export default StoryItem
