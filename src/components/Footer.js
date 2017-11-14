import React from 'react';

class Footer extends React.Component {
  render() {
    return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">footer</h5>
            <p className="grey-text text-lighten-4">footer content</p>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
        © 2017 Copyright indievelop Group
        </div>
      </div>
    </div>
    );
  }
}

export default Footer;
