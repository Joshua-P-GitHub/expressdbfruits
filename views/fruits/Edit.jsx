const React = require('react')
const DefaultLayout = require('../layout/DefaultLayout')


class Edit extends React.Component {
  render() {
    return (
      <DefaultLayout title={'Edit Page'} link={'/fruits'} text={'Home'}>
                <h1>Edit Fruit!</h1>
        <form action={`/fruits/${this.props.fruit._id}?_method=PUT`} method="POST">
          Name: <input type="text" name="name" defaultValue={this.props.fruit.name}/>
          Color: <input type="text" name="color" defaultValue={this.props.fruit.color}/>
          Is Ready To Eat: 
          { this.props.fruit.readyToEat? <input type="checkbox" name="readyToEat" defaultChecked />: <input type="checkbox" name="readyToEat"/> } 
          <input type="submit" value="Create Fruit" />       
        </form>
      </DefaultLayout>
    )
  }
}


module.exports = Edit
