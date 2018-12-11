import React, {Component} from 'react';
import { FlatList,TouchableOpacity,StyleSheet } from 'react-native';
import { Container, Text, Input, Row, Col, Content, Button, Item, List, ListItem, Header, Title } from 'native-base';
import axios from 'axios';

export default class App extends Component {

  constructor(){
    super();
    this.state={
      set: '',
      data: []
    };
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos/')
    .then(response => {
      const data = response.data;
      this.setState({data: data});
    })
  }

  add = () => {
    set = this.state.set;
    if(set.length>0){
      id = Math.max(...this.state.data.map((data) => data.id))+1;
      axios.post('https://jsonplaceholder.typicode.com/todos', {
        userId: 11,
        id: id,
        title: set,
        completed: true
      }).then(() => {
          data = this.state.data.concat({userId:11,id:id,title:set,completed:true})
          this.setState({data:data})
          alert('Added')
          this.setState({set:''})
      });
    } else{
      alert('Please input your to do.')
    }
  }

  set(text){
    this.setState({set:text});
  }

  delete(i,id){
    index = this.state.data.indexOf(i);
    axios.delete('https://jsonplaceholder.typicode.com/todos/' + id.toString())
    .then(
      alert('Deleted')
    );
    data = this.state.data.slice();
    data.splice(index,1);
    this.setState({data:data});
  }

  render() {
    return (
      <Container>
        <Header style={styles.header}>
          <Title style={{color:'black'}}>TO DO APP</Title>
        </Header>
        <Content style={{marginTop:5}}>
          <Row style={{justifyContent:'center'}}>
            <Col style={{flex:0.98}}>
              <Item style={{borderBottomColor:'white'}}>
                <Input value={this.state.set} onSubmitEditing={this.add} onChangeText={(text)=>this.set(text)} placeholder='Type to add to do List' style={styles.input} />
                <Button onPress={this.add} style={styles.button}>
                  <Text>Add</Text>
                </Button>
              </Item>
            </Col>
          </Row>
          <FlatList
            data={this.state.data.sort((a, b) => b.id-a.id)}
            keyExtractor={(item) => item.toString()}
            renderItem={
              ({item}) =>
                <ListItem style={styles.listitem}>
                  <TouchableOpacity style={styles.touch} onLongPress={()=>this.delete(item,item.id)}>
                    <Text style={{width:100+'%'}}>{item.title}</Text>
                  </TouchableOpacity>
                </ListItem>
            }
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    alignItems:'center',
    backgroundColor:'white'
  },
  input: {
    backgroundColor:'#F8F8FF',
    height:'80%',
    borderRadius:10
  },
  button: {
    height:'80%',
    alignSelf:'center',
    borderRadius:10,
    marginLeft:5,
    backgroundColor:'grey'
  },
  listitem: {
    paddingBottom:0,
    paddingTop:0,
    height:50
  },
  touch: {
    flex:1,
    height:100+'%',
    justifyContent:'center'
  },
});