import renderRoutes from './utils/react-router-config/renderRoutes'
import {Link} from 'react-router-dom'
import React from 'react'
import { Tabs, Button,Menu } from 'antd';
import styles from './app.sass'
import './antd.less'
import { connect } from './utils/ecos'
import model from './models'
const TabPane = Tabs.TabPane;
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    let loadRoutes = []
    const panes = this.props.route.routes.map((el,i)=>{
      loadRoutes[i] = true
      return { title: el.name, app: [el], key: el.path, closable: i===0? false : true }
    })
    this.state = {
      activeKey: panes[0].key,
      panes,
      loadRoutes,
      goRoutes:''
    };
    this.onAppStart = ({item, key, keyPath})=>{
      this.add(key)
    }
  }

  onChange = (activeKey) => {
    this.setState({ activeKey });
  }
  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }
  add = (targetKey) => {
    let newLoadRoutes = []
    for (var i = 0; i < this.state.panes.length; i++) {
      let pane = this.state.panes[i]
      if(pane.key === targetKey){
        newLoadRoutes[i] = true
        continue
      }
      newLoadRoutes[i] = this.state.loadRoutes[i]
    }
    this.setState({
      loadRoutes: newLoadRoutes,
      activeKey: targetKey
    })
    this.props.history.push(targetKey)
  }
  remove = (targetKey) => {
    let newLoadRoutes = []
    for (var i = 0; i < this.state.panes.length; i++) {
      let pane = this.state.panes[i]
      if(pane.key === targetKey){
        newLoadRoutes[i] = false
        continue
      }
      newLoadRoutes[i] = this.state.loadRoutes[i]
    }
    this.setState({
      loadRoutes: newLoadRoutes,
      activeKey: '/'
    },()=>{
      debugger
      // this.props.parentAction.app.unmodel(targetKey)
    })
    this.props.history.push('/')
  }
  render() {
    let panes = this.state.panes.filter((pane,index) => {
                  return this.state.loadRoutes[index]
                })
    return (
    <div className={styles.app}>
        <Menu mode="horizontal" onClick={this.onAppStart}>
          <Menu.Item key="/editor">Editor</Menu.Item>
          <Menu.Item key="/markdown">Markdown</Menu.Item>
        </Menu>
        <Tabs
        onChange={this.onChange}
        activeKey={this.state.activeKey}
        type="editable-card"
        onEdit={this.onEdit}
        >
          {
            panes.map((pane,index) => {
                return (
                  <TabPane 
                    tab={(<Link to={pane.key}>{pane.title}</Link>)} 
                    key={pane.key}
                    closable={pane.closable}
                     >
                      {renderRoutes(pane.app)}
                    </TabPane>
                    )
              })
          }
        </Tabs>
        <Button onClick={()=>{
            this.props.dispatch({
              type:'//asyncLogin'
            })
            this.props.dispatch({
              type:'/editor/setText',
              payload: 'fromParent'
            })
          }
        }>
          testReducer
        </Button>
        <span>
          {this.props.reduxState.login?'yes':'no'}
        </span>
      </div>
    );
  }
}

export default connect(model)(Demo,true)