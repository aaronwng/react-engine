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
    const panes = this.props.route.routes.map((el,i)=>{
      return { title: el.name, app: [el], load: true, key: el.path, closable: i===0? false : true }
    })
    this.state = {
      activeKey: panes[0].key,
      panes,
    };
    this.onAppStart = ({item, key, keyPath})=>{

    }
  }

  onChange = (activeKey) => {
    this.setState({ activeKey });
  }
  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }
  add = (targetKey) => {
    const panes = this.state.panes;
    if(this.newTabIndex<this.props.route.routes.length){
      let el = this.props.route.routes.find(el=>el.key===targetKey)
      if(!el){
        return
      }
      const activeKey = this.newTabIndex;
      const pane = panes.find(el=>el.key===targetKey)
      if(pane){
        this.setState({ activeKey });
        return
      }
      panes.push({ title: el.name, key: el.path,closable: this.newTabIndex===0? false : true });
      this.setState({ panes, activeKey });
      this.newTabIndex++
    }
  }
  remove = (targetKey) => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.props.parentAction.app.unmodel(targetKey)
    this.setState({ panes, activeKey });
  }
  render() {
    return (
    <div className={styles.app}>
        <Menu mode="horizontal" onClick={this.onAppStart}>
          <Menu.Item>Editor</Menu.Item>
          <Menu.Item>Markdown</Menu.Item>
        </Menu>
        <Tabs
        onChange={this.onChange}
        activeKey={this.state.activeKey}
        type="editable-card"
        onEdit={this.onEdit}
        >
          {
            this.state.panes.map((pane,index) => {
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
              type:'/asyncLogin'
            })
            this.props.dispatch({
              type:'editor/setText',
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

export default connect(model)(Demo)