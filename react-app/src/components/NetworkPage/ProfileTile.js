import pic from "../../../src/images/profilepic.jpg"
import React from "react"
import "./NetworkPage.css"
import cover from "../../images/sahara.jpg"
function ProfileTile (){
    return(
        <>
            <div className="test">
                <div className="tile-container">
                    <div className="photo-container">
                        <img className="cover-pic" alt="sahara" src={cover}/>
                        <img className="avatar-pic" alt="nancy" src={pic}/>
                    </div>
                    <div className="profile-text">
                        <p className="name">Nancy E. Smith</p>
                        <p className="job">Artistic Director <br/>
                    Frequent Flyers Aerial Dance</p>
                    </div>
                    <div className="connect-btn">
                        <button className="connect">Connect</button>
                    </div>
                </div>
                <div className="tile-container">
                    <div className="photo-container">
                        <img className="cover-pic" alt="sahara" src={cover}/>
                        <img className="avatar-pic" alt="nancy" src={pic}/>
                    </div>
                    <div className="profile-text">
                        <p className="name">Nancy E. Smith</p>
                        <p className="job">Artistic Director <br/>
                    Frequent Flyers Aerial Dance</p>
                    </div>
                    <div className="connect-btn">
                        <button className="connect">Connect</button>
                    </div>
                </div>
                <div className="tile-container">
                    <div className="photo-container">
                        <img className="cover-pic" alt="sahara" src={cover}/>
                        <img className="avatar-pic" alt="nancy" src={pic}/>
                    </div>
                    <div className="profile-text">
                        <p className="name">Nancy E. Smith</p>
                        <p className="job">Artistic Director <br/>
                    Frequent Flyers Aerial Dance</p>
                    </div>
                    <div className="connect-btn">
                        <button className="connect">Connect</button>
                    </div>
                </div>
                <div className="tile-container">
                    <div className="photo-container">
                        <img className="cover-pic" alt="sahara" src={cover}/>
                        <img className="avatar-pic" alt="nancy" src={pic}/>
                    </div>
                    <div className="profile-text">
                        <p className="name">Nancy E. Smith</p>
                        <p className="job">Artistic Director <br/>
                    Frequent Flyers Aerial Dance</p>
                    </div>
                    <div className="connect-btn">
                        <button className="connect">Connect</button>
                    </div>
                </div>
                <div className="tile-container">
                    <div className="photo-container">
                        <img className="cover-pic" alt="sahara" src={cover}/>
                        <img className="avatar-pic" alt="nancy" src={pic}/>
                    </div>
                    <div className="profile-text">
                        <p className="name">Nancy E. Smith</p>
                        <p className="job">Artistic Director <br/>
                    Frequent Flyers Aerial Dance</p>
                    </div>
                    <div className="connect-btn">
                        <button className="connect">Connect</button>
                    </div>
                </div>
                <div className="tile-container">
                    <div className="photo-container">
                        <img className="cover-pic" alt="sahara" src={cover}/>
                        <img className="avatar-pic" alt="nancy" src={pic}/>
                    </div>
                    <div className="profile-text">
                        <p className="name">Nancy E. Smith</p>
                        <p className="job">Artistic Director <br/>
                    Frequent Flyers Aerial Dance</p>
                    </div>
                    <div className="connect-btn">
                        <button className="connect">Connect</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProfileTile;
