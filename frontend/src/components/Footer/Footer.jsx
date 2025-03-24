import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>Craving your favorite meal but don't feel like leaving the couch? With our food delivery service, you can enjoy a wide variety of cuisines and restaurants, all delivered straight to your doorstep. From mouthwatering burgers to fresh sushi, we've got something for everyone. Order now and experience the ease of delicious dining, without the hassle!
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>

        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-212-456-7890</li>
            <li>contact@tomato.com</li>
          </ul>

        </div>
      </div>
      <hr />
      <p className="footer-copyright">copyright 2025 @ tomato.com - All Right Reserved.</p>

    </div>
  )
}

export default Footer
