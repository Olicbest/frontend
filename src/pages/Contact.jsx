import React from 'react'

const Contact = () => {
  return (
    <div>
        <h2>Contact Us</h2>
        <form>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <textarea placeholder="Message" rows="5" />
          <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default Contact