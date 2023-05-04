const React = require("react")
const Nav = require("../components/Nav");
const Fruit = require("../../models/fruit");
const DefaultLayout = require('../layout/DefaultLayout')
class Index extends React.Component {
  render() {
    const { fruits } = this.props
    return(
      <DefaultLayout title={'Index page'} text={'create a Fruit'} link={'/fruits/new'}>
        <h1>Fruits Index Page</h1>
        <ul>
            {fruits.map((fruit, i) => {
                return (
                    <li key={i}>
                        The {" "}
                        <a href={`/fruits/${fruit._id}`}>
                            {fruit.name}
                        </a>{" "}
                        is {fruit.color} <br></br>
                        {fruit.readyToEat
                            ? `It is ready to eat`
                            : `It is not ready to eat`}
                        <br />
                        <a href={`/fruits/${fruit._id}/edit`}>Edit</a>
                        <form action={`/fruits/${fruit._id}?_method=DELETE`} method="POST">
                            <input type="submit" value={'DELETE'}/>
                        </form>
                    </li>
                );
            })}
        </ul>
    </DefaultLayout>
    )
  }
}

module.exports = Index

