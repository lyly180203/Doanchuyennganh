import React from 'react'
import './Contact.css'
import IMG  from '../consts/img';

const Contact = () => {
  return (
    <section className="contact" id="contact">
      <h1 className="heading"><span>Liên hệ </span>chúng tôi</h1>
      <div className="row">
        <form action="">
          <input type="text" placeholder="name" className="box" />
          <input type="email" placeholder="email" className="box" />
          <input type="number" placeholder="number" className="box" />
          <textarea className="box" placeholder="message" cols="30" rows="10"></textarea>
          <input type="submit" value="send message" className="btn" />
        </form>
        <div className="image">
          <img src={`${IMG}/lienhe.jpg`} alt="Liên hệ" />
        </div>
      </div>
    </section>
  );
}

export default Contact;
