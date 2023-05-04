const React = require('react');
const Nav = require('../components/Nav')

class IndexVegetable extends React.Component {
  render() {
      const { vegetables } = this.props;
      return (
              <div>
                  <h1>Vegetables Index Page</h1>
                  <Nav link='/vegetables/new' text='Create A Veggie'/>
                  <ul>
                      {vegetables.map((vegetable, i) => {
                          return (
                              <li>
                                  The{' '}
                                  <a href={`/vegetables/${vegetable._id}`}>
                                      {vegetable.name}
                                  </a>{' '}
                                  is {vegetable.color} <br></br>
                                  {vegetable.readyToEat
                                      ? `It is ready to eat`
                                      : `It is not ready to eat`}
                                  <br />
                              </li>
                          );
                      })}
                  </ul>
              </div>
      );
  }
}
module.exports = IndexVegetable;





