const React = require('react')
const Nav = require('../components/Nav')

class DefaultLayout extends React.Component {
  render() {
    return (
      <html>
        <head>
          <title>
            {this.props.title}
          </title>
          <link rel="stylesheet" href="/css/app.css" />
        </head>
        <body>
          <h1>{this.props.title}</h1>
          <Nav link={this.props.link} text={this.props.text}/>
          {this.props.children}
        </body>
      </html>
    )
  }
}

module.exports = DefaultLayout