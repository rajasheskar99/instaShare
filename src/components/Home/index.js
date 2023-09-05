import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Slider from 'react-slick'
import "~slick-carousel/slick/slick.css"; 
import "~slick-carousel/slick/slick-theme.css";
import Header from '../Header'

import './index.css'

class Home extends Component {
  state = {userStories: []}

  componentDidMount() {
    this.getUserStories()
  }

  getUserStories = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const stories = await response.json()
      const updateStories = stories.users_stories.map(each => ({
        userId: each.user_id,
        storyUrl: each.story_url,
        userName: each.user_name,
      }))
      this.setState({userStories: updateStories})
    }
  }

  render() {
    const {userStories} = this.state
    console.log(userStories)

    const settings = {
      dots: false,
      slidesToShow: 9,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1250,
          setting: {
            slidesToShow: 8,
          },
        },
        {
          breakpoint: 1150,
          setting: {
            slidesToShow: 7,
          },
        },
        {
          breakpoint: 1050,
          setting: {
            slidesToShow: 6,
          },
        },
        {
          breakpoint: 950,
          setting: {
            slidesToShow: 5,
          },
        },
        {
          breakpoint: 750,
          setting: {
            slidesToShow: 4,
          },
        },
        {
          breakpoint: 512,
          setting: {
            slidesToShow: 3,
          },
        },
      ],
    }

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <>
        <Header />
        <div className="home-container">
          <ul className="stories-sec">
            <Slider {...settings}>
              {userStories.map(eachStory => {
                const {userName, storyUrl, userId} = eachStory
                return (
                  <li className="story" key={userId}>
                    <img
                      src={storyUrl}
                      alt="user story"
                      className="story-image"
                    />
                    <p className="story-text">{userName}</p>
                  </li>
                )
              })}
            </Slider>
          </ul>
        </div>
      </>
    )
  }
}

export default Home
