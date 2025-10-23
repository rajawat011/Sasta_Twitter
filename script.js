import {tweetsData} from "./data.js"
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
uuidv4();

const tweetInput = document.getElementById("tweet-input")
const feed = document.getElementById("feed")
  

document.addEventListener('click',function(e){
    
    if(e.target.dataset.likes) {
        handleLikeClicks(e.target.dataset.likes)
    } else if(e.target.dataset.retweets) {
        handleRetweetClicks(e.target.dataset.retweets)
    } else if(e.target.dataset.reply){
        handleReplyClicks(e.target.dataset.reply)
    } else if(e.target.id === "tweet-btn") {
        handleTweetBtnClicks()
    }
})

function handleTweetBtnClicks() {

    let tweetsInput = tweetInput.value
    tweetInput.value = ""

    if (!(tweetsInput.trim() === "")) {
        tweetInput.value = ""
        tweetsData.unshift({
            handle:`@kanchanRajawat ✅`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetsInput,
            replies: [],
            isLiked: false, 
            isRetweeted: false,
            uuid: uuidv4()
        })
        render()
        
    } else {
        console.log("else statement working")
    }
  
}


function handleLikeClicks(tweetId) {
    const targetTweetObj = tweetsData.filter((tweet)=>{
                return tweet.uuid === tweetId
    })[0]


    if(targetTweetObj.isLiked) {
        targetTweetObj.likes--
    } else {
        targetTweetObj.likes++
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked

  render()

}

function handleRetweetClicks(tweetId) {
    const targetTweetObj = tweetsData.filter((tweet)=>{
        return tweet.uuid === tweetId
    })[0]
    if(targetTweetObj.isRetweeted) {
        targetTweetObj.retweets--
    } else{
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
  
    render()
}

function handleReplyClicks(tweetId) {
    document.getElementById(`replies-${tweetId}`).classList.toggle('hidden')
}
    


function getFeedHtml() {
    let feedHtml = ""
    
    tweetsData.forEach(function(tweet){
        let heartClass = ""
        if(tweet.isLiked) {
            heartClass = "liked"
        } 



        let retweetClass = ""
        if(tweet.isRetweeted) {
            retweetClass = "retweeted"
        } 


       
        let replyHtml = ""
        if(tweet.replies.length > 0 ) {
            
            tweet.replies.forEach(function(reply){
                replyHtml += `<div class="tweet-reply">
                                <div class ="tweet-inner">
                                    <img src="${reply.profilePic}" class="profile-pic">
                                    <div>
                                        <p class="handle">${reply.handle}</p>
                                        <p class="tweet-text">${reply.tweetText}</p>
                                    </div>
                                </div>
                            </div>`
            })

            
        }



        feedHtml += `<div class="tweet">
                        <div class="tweet-inner">
                            <img src="${tweet.profilePic}" class="profile-pic">
                            <div>
                                <p class="handle">${tweet.handle}</p>
                                <p class="tweet-text">${tweet.tweetText}</p>
                                <div class="tweet-details">
                                    <span class="tweet-detail">
                                        <i class="fa-regular fa-comment-dots"
                                        data-reply="${tweet.uuid}"></i>
                                        ${tweet.replies.length}
                                    </span>
                                    <span class="tweet-detail">
                                        <i class="fa-solid ${heartClass} fa-heart"
                                        data-likes="${tweet.uuid}"></i>
                                        ${tweet.likes}
                                    </span>
                                    <span class="tweet-detail">
                                        <i class="fa-solid ${retweetClass} fa-retweet"
                                        data-retweets="${tweet.uuid}"></i>
                                        ${tweet.retweets}
                                    </span>
                                </div>   
                            </div>            
                        </div>
                        <div class="hidden" id="replies-${tweet.uuid}"> ${replyHtml}</div>
                    </div>`
    })

    return feedHtml
}

function render() {
    feed.innerHTML = getFeedHtml()
}
render()


