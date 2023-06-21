import { Component } from 'react';

class APIPhoto extends Component {
  constructor(url) {
    super();
    this.state = {
      photos: []
    };
  }

  componentDidMount() {
    fetch(this.props.api)
      .then(response => {
        console.log('response', response);
        if(!response.ok) {
          throw Error("Error fetching QR code");
        }
        return response.json();
      })
      .then(data => {
        this.setState({ qrLink: data.message });
      })
      .catch(err => {
        throw Error(err.message)
      })
  }
  
  render() {
    return (
      <Photo photos={this.state.qrLink.message} />
    )
  };
}

export default APIPhoto;
